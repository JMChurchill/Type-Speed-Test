const usernameBox = document.getElementById("username");
const letterSelectors = document.getElementById("letterSelectors");
const overlay = document.getElementById("user-overlay");
const finOverlay = document.getElementById("congrats-overlay");
const leaderOverlay = document.getElementById("leader-overlay");
const welcomeMsg = document.getElementById("welcome-message");

const toType = document.getElementById("toType");

const textBox = document.getElementById("textField");

const timeH2 = document.getElementById("time");

const leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

const uname = localStorage.getItem("name");
if (uname != "" && uname != null && uname) {
  overlay.style.display = "none";
  welcomeMsg.innerText =
    "Hello " + uname + " can you improve your typing speed?";
}

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
  }, 500); // runs every half second
};

const stopTimer = () => {
  timerStarted = false;
};

const updateOnType = () => {
  const textBoxValue = textBox.value;
  if (
    originalInsensitive.length === textBoxValue.length &&
    originalInsensitive === textBoxValue.toLowerCase()
  ) {
    //   finished
    toType.innerHTML = `<p id="toType"><span class="highlighted">${original}</span></p>`;
    stopTimer();
    updateCongratesOverlay();

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
    if (
      originalInsensitive.charAt(i) !== textBoxValue.charAt(i).toLowerCase()
    ) {
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

const updateCongratesOverlay = () => {
  let curLet = localStorage.getItem("currentLetter");

  let nextLet =
    curLet.substring(0, curLet.length - 1) +
    String.fromCharCode(curLet.charCodeAt(curLet.length - 1) + 1);

  localStorage.setItem("progress", nextLet);
  document.getElementById("letterSelectors").innerHTML = "";
  populateLevelSelector(nextLet);

  finOverlay.style.display = "flex";
  stats = document.getElementById("stats");
  timeTaken = document.createElement("H2");
  timeTaken.innerText = `You took ${timer} seconds`;
  stats.appendChild(timeTaken);

  let wpm = calculateWordsPerMin(timer);
  wordsPer = document.createElement("H2");
  wordsPer.innerText = `${wpm} words per minute`;
  stats.appendChild(wordsPer);
  let username = localStorage.getItem("name");
  // user = { name: username, time: timer };
  user = { name: username, wpm: wpm, time: timer };
  addToLeaderboard(user);
};

const viewLeaderboard = () => {
  leaderOverlay.style.display = "flex";
};

closeCongrats = () => {
  finOverlay.style.display = "none";
};

const addToLeaderboard = (user) => {
  leaderboard.push(user);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  populateLeaderBoard();
};

const populateLeaderBoard = () => {
  let uName = localStorage.getItem("name");

  leaderboard.sort((secondItem, firstItem) => firstItem.wpm - secondItem.wpm);
  const table = document.getElementById("tableBody");
  document.getElementById("tableBody").innerHTML = "";
  leaderboard.forEach((user, index) => {
    let row = table.insertRow();
    let position = row.insertCell(0);
    if (user.name == uName) row.style.color = "green";
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

const generateSentence = async (letter = "q") => {
  let { adjectives, adverbs, nouns, prepositions, verbs } = await getData();
  if (letter != null && letter != "") {
    //filter to contain letter
    adjectives = adjectives.filter((x) => x.includes(letter));
    adverbs = adverbs.filter((x) => x.includes(letter));
    nouns = nouns.filter((x) => x.includes(letter));
    prepositions = prepositions.filter((x) => x.includes(letter));
    verbs = verbs.filter((x) => x.includes(letter));

    //order by occurance of selected letter
    adjectives = adjectives.sort(function (a, b) {
      return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
    });
    adverbs = adverbs.sort(function (a, b) {
      return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
    });
    nouns = nouns.sort(function (a, b) {
      return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
    });
    prepositions = prepositions.sort(function (a, b) {
      return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
    });
    verbs = verbs.sort(function (a, b) {
      return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
    });
  }

  const randFrom = (arr) => {
    if (letter != null && letter != "") {
      var result = Math.random();
      result =
        result *
        result *
        result *
        result *
        result *
        result *
        result *
        result *
        result *
        result;
      result *= arr.length - 1;
      return (result = Math.floor(result));
    } else {
      return Math.floor(Math.random() * arr.length - 1);
    }
  };
  var adj1 = randFrom(adjectives);
  var adj2 = randFrom(adjectives);
  var adj3 = randFrom(adjectives);
  var adj5 = randFrom(adjectives);
  var adv1 = randFrom(adverbs);
  var adv2 = randFrom(adverbs);
  var nou1 = randFrom(nouns);
  var nou2 = randFrom(nouns);
  var nou3 = randFrom(nouns);
  var nou4 = randFrom(nouns);
  var pre1 = randFrom(prepositions);
  var ver1 = randFrom(verbs);
  var ver2 = randFrom(verbs);

  var content =
    "The " +
    adjectives[adj1] +
    " " +
    nouns[nou1] +
    " " +
    adverbs[adv1] +
    " " +
    verbs[ver1] +
    " because some " +
    nouns[nou2] +
    " " +
    adverbs[adv2] +
    " " +
    verbs[ver2] +
    " " +
    prepositions[pre1] +
    " a " +
    adjectives[adj3] +
    " " +
    nouns[nou3] +
    " which, became a " +
    adjectives[adj5] +
    " " +
    nouns[nou4] +
    ".";
  original = document.getElementById("toType").innerText = content;
  originalInsensitive = document
    .getElementById("toType")
    .innerText.toLowerCase();
};

let verbs, nouns, adjectives, adverbs, prepositions;

const getData = async () => {
  adjectives = await fetch("../schemas/adjectives.json").then((results) =>
    results.json()
  );
  adverbs = await fetch("../schemas/adverbs.json").then((results) =>
    results.json()
  );
  nouns = await fetch("../schemas/nouns.json").then((results) =>
    results.json()
  );
  prepositions = await fetch("../schemas/prepositions.json").then((results) =>
    results.json()
  );
  verbs = await fetch("../schemas/verbs.json").then((results) =>
    results.json()
  );
  return { adjectives, adverbs, nouns, prepositions, verbs };
};
let curLet = localStorage.getItem("currentLetter");
if (curLet) {
  generateSentence(curLet);
} else {
  generateSentence();
}
const populateLevelSelector = (progress = "") => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < alphabet.length; i++) {
    letterSelectors;
    letter = document.createElement("div");
    letter.className = "letter-selector";
    letter.id = `selector-${alphabet[i]}`;
    if (
      progress >= alphabet[i] ||
      (progress == null && alphabet[i] == "a") ||
      (progress == "" && alphabet[i] == "a")
    ) {
      letter.setAttribute("aria-active", "true");
      letter.onclick = function () {
        generateSentence(alphabet[i]);
        const collection = document.getElementsByClassName("letter-selector");
        for (let item of collection) {
          item.style.color = "black";
          item.setAttribute("aria-current", "false");
        }
        localStorage.setItem("currentLetter", alphabet[i]);
        let selectedLetter = document.getElementById(`selector-${alphabet[i]}`);
        selectedLetter.setAttribute("aria-current", "true");
      };
    } else {
      letter.setAttribute("aria-current", "false");
    }
    letter.innerText = alphabet[i];
    let curLet = localStorage.getItem("currentLetter");

    if (curLet == alphabet[i]) {
      letter.setAttribute("aria-current", "true");
    } else {
      letter.setAttribute("aria-current", "false");
    }
    letterSelectors.appendChild(letter);
  }
};
let curProgress = localStorage.getItem("progress");

populateLevelSelector(curProgress);

const nextLetter = () => {
  let curLet = localStorage.getItem("currentLetter");
  if (curLet == "z") {
    alert("completed all leters");
    return;
  }
  let nextLet =
    curLet.substring(0, curLet.length - 1) +
    String.fromCharCode(curLet.charCodeAt(curLet.length - 1) + 1);
  localStorage.setItem("currentLetter", nextLet);
  generateSentence(curLet);
  restart();
  generateSentence(curLet);
  const collection = document.getElementsByClassName("letter-selector");
  for (let item of collection) {
    item.style.color = "black";
    item.setAttribute("aria-current", "false");
  }
  let selectedLetter = document.getElementById(`selector-${nextLet}`);
  selectedLetter.setAttribute("aria-current", "true");
};

const restart = () => {
  finOverlay.style.display = "none";
  leaderOverlay.style.display = "none";
  textBox.value = "";
  stats = document.getElementById("stats");
  stats.removeChild(timeTaken);
  stats.removeChild(wordsPer);

  updateOnType();
};
