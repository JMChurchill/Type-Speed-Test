class Leaderboard {
  constructor() {
    this.data = JSON.parse(localStorage.getItem("leaderboard"));
    let a = this.data.filter((a) => a.wpm != "Infinity");
    // localStorage.setItem("leaderboard", JSON.stringify(a));
  }
  //   viewLeaderboard = () => {
  //     leaderOverlay.style.display = "flex";
  //   };

  populateLeaderBoard = () => {
    let uName = localStorage.getItem("name");

    this.data.sort((secondItem, firstItem) => firstItem.wpm - secondItem.wpm);
    const table = document.getElementById("tableBody");
    document.getElementById("tableBody").innerHTML = "";
    this.data.forEach((user, index) => {
      if (user != null) {
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
      }
    });
  };
  add = (user) => {
    this.data.push(user);
    localStorage.setItem("leaderboard", JSON.stringify(this.data));
    this.populateLeaderBoard();
  };
}
