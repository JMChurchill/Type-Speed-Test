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
  { name: "user5", time: 5.5 },
  { name: "user4", time: 0.5 },
  { name: "user1", time: 0.5 },
  { name: "user3", time: 0.5 },
  { name: "user2", time: 1.5 },
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
    toType.innerHTML = `<p><span class="highlighted">${original}</span></p>`;
    stopTimer();
    timeH2.innerText = `You took ${timer} seconds`;
    user = { name: username, time: timer };
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
      toType.innerHTML = `<p><span class="highlighted">${replacementValue}</span><span class="mistake">${mistake}</span>${end}</p>`;
      return;
    } else {
      for (let j = 0; j <= i; j++) {
        replacementValue = replacementValue + original.charAt(j);
      }
      for (j = i + 1; j < originalInsensitive.length; j++) {
        end = end + originalInsensitive.charAt(j);
      }
      toType.innerHTML = `<p><span class="highlighted">${replacementValue}</span>${end}</p>`;
    }
  }
  if (textBoxValue.length === 0) {
    toType.innerHTML = `<p>${original}</p>`;
  }
};

const addToLeaderboard = (user) => {
  leaderboard.push(user);
  leaderboard.sort((firstItem, secondItem) => firstItem.time - secondItem.time);
  populateLeaderBoard();
};

const populateLeaderBoard = () => {
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
    let time = row.insertCell(2);
    time.innerHTML = user.time;
  });
};

textBox.addEventListener("input", updateOnType);
usernameBox.addEventListener("input", () => {
  username = usernameBox.value;
});
