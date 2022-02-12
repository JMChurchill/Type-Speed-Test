// alert("connected");
const usernameBox = document.getElementById("username");

const toType = document.getElementById("toType");
const original = document.getElementById("toType").innerText;
const originalInsensitive = document
  .getElementById("toType")
  .innerText.toLowerCase();
const textBox = document.getElementById("textField");

const timeH2 = document.getElementById("time");

const leaderboard = [
  { name: "user5", wpm: 50.22 },
  { name: "user4", wpm: 20.9 },
  { name: "user1", wpm: 100.01 },
  { name: "user3", wpm: 35.11 },
  { name: "user2", wpm: 70.22 },
];

let username;
let timer = 0;
let timerStarted = false;

const startTimer = () => {
  const start = Date.now();
  timerStarted = true;
  let myTimer = setInterval(() => {
    if (!timerStarted) {
      clearInterval(myTimer);
    }
    const delta = Date.now() - start;
    rounded = Math.floor(delta / 1000);
    // timer = delta / 1000;
    if (delta / 1000 - rounded < 0.5) {
      timer = rounded;
    } else {
      timer = rounded + 0.5;
    }
    // console.log(timer);
  }, 500); // runs every half second
};

const stopTimer = () => {
  timerStarted = false;
};

const updateOnType = () => {
  const textBoxValue = textBox.value;
  if (
    originalInsensitive.length === textBoxValue.length &&
    originalInsensitive === textBoxValue
  ) {
    //   finished
    toType.innerHTML = `<p id="toType"><span class="highlighted">${original}</span></p>`;
    stopTimer();

    stats = document.getElementById("stats");
    timeTaken = document.createElement("H2");
    timeTaken.innerText = `You took ${timer} seconds`;
    stats.appendChild(timeTaken);

    let wpm = calculateWordsPerMin(timer);
    wordsPer = document.createElement("H2");
    wordsPer.innerText = `${wpm} words per minute`;
    stats.appendChild(wordsPer);

    user = { name: username, time: timer };
    user = { name: username, wpm: wpm };
    addToLeaderboard(user);
    // populateLeaderBoard();
    return;
  } else if (timerStarted === false) {
    startTimer();
  }
  //   loop through two strings
  for (
    let i = 0;
    i < (originalInsensitive.length && textBoxValue.length);
    i++
  ) {
    let replacementValue = "";
    let end = "";
    let mistake = "";
    if (originalInsensitive.charAt(i) !== textBoxValue.charAt(i)) {
      for (let j = 0; j <= i; j++) {
        if (j !== i) {
          replacementValue = replacementValue + original.charAt(j);
        } else {
          mistake = originalInsensitive.charAt(j);
        }
      }
      for (j = i + 1; j < originalInsensitive.length; j++) {
        end = end + originalInsensitive.charAt(j);
      }
      toType.innerHTML = `<p id="toType"><span class="highlighted">${replacementValue}</span><span class="mistake">${mistake}</span>${end}</p>`;
      return;
    } else {
      for (let j = 0; j <= i; j++) {
        replacementValue = replacementValue + original.charAt(j);
      }
      for (j = i + 1; j < originalInsensitive.length; j++) {
        end = end + originalInsensitive.charAt(j);
      }
      toType.innerHTML = `<p id="toType"><span class="highlighted">${replacementValue}</span>${end}</p>`;
    }
  }
  if (textBoxValue.length === 0) {
    toType.innerHTML = `<p id="toType">${original}</p>`;
  }
};

const addToLeaderboard = (user) => {
  leaderboard.push(user);
  populateLeaderBoard();
};

const populateLeaderBoard = () => {
  leaderboard.sort((secondItem, firstItem) => firstItem.wpm - secondItem.wpm);
  const table = document.getElementById("tableBody");
  document.getElementById("tableBody").innerHTML = "";
  leaderboard.forEach((user, index) => {
    let row = table.insertRow();
    let position = row.insertCell(0);
    position.innerHTML = index + 1;
    let name = row.insertCell(1);
    if (user.name === "" || user.name === null || user.name === undefined) {
      name.innerHTML = "Unknown user";
    } else {
      name.innerHTML = user.name;
    }
    let wpm = row.insertCell(2);
    wpm.innerHTML = user.wpm;
  });
};

const calculateWordsPerMin = (time) => {
  //get number of words
  numWords = 1;
  tempOriginal = original.replace(/[\s]+/gim, " ");
  tempOriginal.replace(/(\s+)/g, () => {
    numWords++;
  });
  console.log(numWords);
  //calculate words per minute
  wordsPerMinute = numWords / (time / 60);
  return wordsPerMinute.toFixed(2);
};

textBox.addEventListener("input", updateOnType);
usernameBox.addEventListener("input", () => {
  username = usernameBox.value;
});
