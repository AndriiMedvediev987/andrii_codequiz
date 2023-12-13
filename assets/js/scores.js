// get elements from DOM
let clearScoresButton = document.getElementById("clear");
let scoreList = document.getElementById("highscores");

// event handler sections
let clearScores = function () {
    window.localStorage.removeItem("quizScores");
    window.location.reload();
}
clearScoresButton.onclick = clearScores;

// show results section
let showScores = function () {
    let local = window.localStorage.getItem("quizScores");
    let scores = local ? JSON.parse(local) : [];
    scores.forEach((item) => {
        let score = document.createElement('li');
        score.textContent = `Name: ${item.initials}, Score: ${item.score}`;
        scoreList.appendChild(score);
    });
}

showScores();