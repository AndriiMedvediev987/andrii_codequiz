// init utility variables
let quizTime = questions.length * 15;
let timer = 0;
let questionIndex = 0;

// get buttons from DOM
let startButton = document.getElementById("start");
let submitButton = document.getElementById("submit");

// get sections from DOM
let startSection = document.getElementById("start-screen");
let questionsSection = document.getElementById("questions");
let endScreenSection = document.getElementById("end-screen");
let feedbackSection = document.getElementById("feedback");

// get text elements from DOM
let timeLabel = document.getElementById("time");
let questionTitle = document.getElementById("question-title");
let choises = document.getElementById("choices");
let finalScore = document.getElementById('final-score');
let initialsInput = document.getElementById('initials');

// Event handlers section

let runQuiz = function () {
    updateVisibleSection(0);

    timeLabel.textContent = quizTime;
    timer = setInterval(timerClick, 1000);
    loadQuestion();
}

let choiseCLick = function (event) {
    let button = event.target;
    if (button.matches(".choice")) {
        if (button.value === questions[questionIndex].answer) {
            feedbackSection.textContent = "Correct!";
        }
        else {
            quizTime = Math.max(0, quizTime - 15);
            timeLabel.textContent = quizTime;
            feedbackSection.textContent = "Wrong!";
        }

        feedbackSection.setAttribute('class', 'feedback');
        setTimeout(() => {
            feedbackSection.setAttribute('class', 'feedback hide');
          }, "800");
        questionIndex++;
        if (quizTime > 0 && questionIndex < questions.length){
            loadQuestion();
        }
        else{
            stopQuiz();
        }
    }
}

let stopQuiz = function () {
    clearInterval(timer);
    updateVisibleSection(1);
    finalScore.textContent = quizTime;
  }

let loadQuestion = function () {
    let current = questions[questionIndex];
    questionTitle.textContent = current.title;
    choises.innerHTML = "";
    for (let i = 0; i < current.choices.length; i++) {
        let choice = current.choices[i];
        let choiceButton = document.createElement('button');
        choiceButton.setAttribute('class', 'choice');
        choiceButton.setAttribute('value', choice);

        choiceButton.textContent = i + 1 + '. ' + choice;
        choises.appendChild(choiceButton);
    };
}

let submitScore = function(event){
    let currentInitials = initialsInput.value.trim(); 
    if (currentInitials){
        let local = window.localStorage.getItem("quizScores");
        let scores = local ? JSON.parse(local): [];
        let scoreData = {
            initials: currentInitials,
            score: quizTime,
        }

        scores.push(scoreData);

        window.localStorage.setItem("quizScores", JSON.stringify(scores));

window.location.href = "highscores.html";
    }
}
// update timer
let timerClick = function () {
    quizTime--;
    timeLabel.textContent = quizTime;

    // fail quiz due to luck of time
    if (quizTime <= 0)
        stopQuiz();
}

// set some sections visible\invisible
let updateVisibleSection = function (index) {
    switch (index) {
        case 0:
            startSection.setAttribute("class", "hide");
            questionsSection.removeAttribute("class");
            break;
        case 1:
            questionsSection.setAttribute("class", "hide");
            endScreenSection.removeAttribute("class");
            break;
        case 2:
            endScreenSection.setAttribute("class", "hide");
            feedbackSection.removeAttribute("class");
            break;
        case 3:
            feedbackSection.setAttribute("class", "hide");
            startSection.removeAttribute("class");
            break;
    }
}

// define event handers
startButton.onclick = runQuiz;
submitButton.onclick = submitScore;
choises.onclick = choiseCLick;