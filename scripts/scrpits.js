// get elements
const usernameBox = document.getElementById("username");
const letterSelectors = document.getElementById("letterSelectors");
const overlay = document.getElementById("user-overlay");
const finOverlay = document.getElementById("congrats-overlay");
const leaderOverlay = document.getElementById("leader-overlay");
const welcomeMsg = document.getElementById("welcome-message");
const toType = document.getElementById("toType");
const textBox = document.getElementById("textField");
const timeH2 = document.getElementById("time");

// initialise objects
const t1 = new Timer();
const lBoard = new Leaderboard();
const sentence = new Sentence();
const levelSelector = new LevelSelector();

const uname = localStorage.getItem("name");
if (uname != "" && uname != null && uname) {
  overlay.style.display = "none";
  welcomeMsg.innerText =
    "Hello " + uname + " can you improve your typing speed?";
}

let username;

const updateOnType = () => {
  const textBoxValue = textBox.value;
  if (
    sentence.originalInsensitive.length === textBoxValue.length &&
    sentence.originalInsensitive === textBoxValue.toLowerCase()
  ) {
    if (t1.running === false) {
      // start timer
      t1.start();
    }
    //   finished
    toType.innerHTML = `<p id="toType"><span class="highlighted">${sentence.original}</span></p>`;
    //stop timer
    let duration = t1.stop();
    updateCongratesOverlay(duration);

    return;
  } else if (t1.running === false) {
    // start timer
    t1.start();
  }
  //   loop through two strings
  for (
    let i = 0;
    i < (sentence.originalInsensitive.length && textBoxValue.length);
    i++
  ) {
    let replacementValue = "";
    let end = "";
    let mistake = "";
    if (
      sentence.originalInsensitive.charAt(i) !==
      textBoxValue.charAt(i).toLowerCase()
    ) {
      for (let j = 0; j <= i; j++) {
        if (j !== i) {
          replacementValue = replacementValue + sentence.original.charAt(j);
        } else {
          mistake = sentence.originalInsensitive.charAt(j);
        }
      }
      for (j = i + 1; j < sentence.originalInsensitive.length; j++) {
        end = end + sentence.originalInsensitive.charAt(j);
      }
      // highlight text
      toType.innerHTML = `<p id="toType"><span class="highlighted">${replacementValue}</span><span class="mistake">${mistake}</span>${end}</p>`;
      return;
    } else {
      for (let j = 0; j <= i; j++) {
        replacementValue = replacementValue + sentence.original.charAt(j);
      }
      for (j = i + 1; j < sentence.originalInsensitive.length; j++) {
        end = end + sentence.originalInsensitive.charAt(j);
      }
      // highlight text
      toType.innerHTML = `<p id="toType"><span class="highlighted">${replacementValue}</span>${end}</p>`;
    }
  }
  if (textBoxValue.length === 0) {
    // starting text
    toType.innerHTML = `<p id="toType">${sentence.original}</p>`;
  }
};

const updateCongratesOverlay = (time) => {
  let curLet = localStorage.getItem("currentLetter");
  let progress = localStorage.getItem("progress");

  let nextLet =
    curLet.substring(0, curLet.length - 1) +
    String.fromCharCode(curLet.charCodeAt(curLet.length - 1) + 1);
  // if completed new highest level unlock next letter
  if (progress < nextLet) {
    localStorage.setItem("progress", nextLet);
    document.getElementById("letterSelectors").innerHTML = "";
    levelSelector.populate(nextLet);
  }

  // display the finished overlay
  finOverlay.style.display = "flex";

  //update the statistics
  stats = document.getElementById("stats");
  timeTaken = document.createElement("H2");
  timeTaken.innerText = `You took ${time} seconds`;
  stats.appendChild(timeTaken);

  let wpm = calculateWordsPerMin(time);
  wordsPer = document.createElement("H2");
  wordsPer.innerText = `${wpm} words per minute`;
  stats.appendChild(wordsPer);

  let username = localStorage.getItem("name");

  // add current time to leaderboard
  user = { name: username, wpm: wpm, time: time };
  lBoard.add(user);
};

const viewLeaderboard = () => {
  // display leaderboard
  leaderOverlay.style.display = "flex";
};

const calculateWordsPerMin = (time) => {
  //get number of words
  numWords = 1;
  tempOriginal = sentence.original.replace(/[\s]+/gim, " ");
  tempOriginal.replace(/(\s+)/g, () => {
    numWords++;
  });
  //calculate words per minute
  wordsPerMinute = numWords / (time / 60);
  return wordsPerMinute.toFixed(2);
};

textBox.addEventListener("input", updateOnType);
usernameBox.addEventListener("input", () => {
  username = usernameBox.value;
});

const saveUsername = () => {
  if (usernameBox.value != null || usernameBox.value != "") {
    overlay.style.display = "none";
    welcomeMsg.innerText =
      "Hello " + usernameBox.value + " can you improve your typing speed?";
    localStorage.setItem("name", usernameBox.value);
  }
};

let curLet = localStorage.getItem("currentLetter");
if (curLet) {
  sentence.generate(curLet);
} else {
  sentence.generate();
}

let curProgress = localStorage.getItem("progress");

levelSelector.populate(curProgress);

const nextLetter = () => {
  let curLet = localStorage.getItem("currentLetter");
  // display completion message if all letters completed
  if (curLet == "z") {
    alert("completed all leters");
    return;
  }
  // get next letter
  let nextLet =
    curLet.substring(0, curLet.length - 1) +
    String.fromCharCode(curLet.charCodeAt(curLet.length - 1) + 1);
  // update local storage with next letter
  localStorage.setItem("currentLetter", nextLet);
  // reset all data
  restart();
  //genertate new sentence
  sentence.generate(curLet);
  // update level selection
  levelSelector.update(nextLet);
};

const restart = () => {
  // hide overlays
  finOverlay.style.display = "none";
  leaderOverlay.style.display = "none";
  // clear textbox
  textBox.value = "";
  // clear stats
  stats = document.getElementById("stats");
  stats.removeChild(timeTaken);
  stats.removeChild(wordsPer);
  // reset timer
  t1.reset();
  // trigger on type to clear highlights
  updateOnType();
};
