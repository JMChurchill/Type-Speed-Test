class LevelSelector {
  constructor() {}
  populate = (progress = "") => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < alphabet.length; i++) {
      //   letterSelectors;
      let letter = document.createElement("div");
      letter.className = "letter-selector";
      letter.id = `selector-${alphabet[i]}`;
      letter.setAttribute("aria-disabled", "true");
      if (
        progress >= alphabet[i] ||
        (progress == null && alphabet[i] == "a") ||
        (progress == "" && alphabet[i] == "a")
      ) {
        letter.setAttribute("aria-disabled", "false");
        letter.onclick = function () {
          // generateSentence(alphabet[i]);
          sentence.generate(alphabet[i]);
          const collection = document.getElementsByClassName("letter-selector");
          for (let item of collection) {
            item.style.color = "black";
            item.setAttribute("aria-current", "false");
          }
          localStorage.setItem("currentLetter", alphabet[i]);
          let selectedLetter = document.getElementById(
            `selector-${alphabet[i]}`
          );
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
  update = (current) => {
    const collection = document.getElementsByClassName("letter-selector");
    for (let item of collection) {
      item.style.color = "black";
      item.setAttribute("aria-current", "false");
    }
    let selectedLetter = document.getElementById(`selector-${current}`);
    selectedLetter.setAttribute("aria-current", "true");
  };
}
// const l = new LevelSelector();
// l.populate();
// l.nextLetter();
