// Global variable declaration for values to be used in the quiz
var timeRemaining; // Time left
var timeInterval; // Timer interval
var quizProgress; // What question we're currently on
var answerChoice; // A choice from 0-3
var finalScore; // The final score for the game

// Question and answers variable
// Answers are used as an array for future methods, as well as adding innerHTML data
var jsQuestionsAnswers = [
    {
        question: "<h2 data-state='correct'>Which of the following is correct about features of JavaScript?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>JavaScript is a lightweight, interpreted programming language.</button>",
            "<button type='button' data-value='1' data-state='incorrect'>JavaScript is designed for creating network-centric applications.</button>",
            "<button type='button' data-value='2' data-state='incorrect'>JavaScript is complementary to and integrated with Java.</button>",
            "<button type='button' data-value='3' data-state='correct'>All of the above.</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Which of the following is the correct syntax to print a page using JavaScript?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='correct'>window.print();</button>",
            "<button type='button' data-value='1' data-state='incorrect'>browser.print();</button>",
            "<button type='button' data-value='2' data-state='incorrect'>navigator.print();</button>",
            "<button type='button' data-value='3' data-state='incorrect'>document.print();</button>"
        ]
    },
]

// Query Selectors for elements on the page
var mainBody = document.querySelector(".main");
var highScoresBtn = document.querySelector(".high-scores");
var timerEl = document.querySelector(".time-left");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizChoiceEl = document.querySelectorAll(".quiz-choice");
var startButtonEl = document.querySelector(".start-button");
var answerValidityEl = document.querySelector(".answer-validity");

// Function for timer
function startTimer(){
    clearInterval(timeInterval); // In case restart quiz was clicked
    timeRemaining = 10;
    timeInterval = setInterval(function(){
        if (timeRemaining !== 0){
            timerEl.textContent = timeRemaining;
            timeRemaining--;
        } else {
            clearInterval(timeInterval);
            timerEl.textContent = timeRemaining;
            quizEndCheck();
        }
    }, 1000);
}

// Function to remove the start button, question and answer choices
function clearQuestionAndChoice(){
    quizQuestionEl.firstElementChild.remove();
    startButtonEl.innerHTML = "<button type='button' class='start'>Restart</button>"
    // For loop that removes all the children elements of the quiz-choice class
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].firstElementChild.remove();
        quizChoiceEl[i].removeEventListener("click", selectAnswer);
    }
}

// Function to build a question and answer choices, as well as adds click event listeners for answer selection
function buildQuestionAndChoice(questionNum){
    quizQuestionEl.innerHTML = jsQuestionsAnswers[questionNum].question;
    // For loop that adds the questions as children to the quiz-choice class
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].innerHTML = jsQuestionsAnswers[questionNum].answers[i];
        quizChoiceEl[i].addEventListener("click", selectAnswer);
    }
}

// Function to initialize the quiz
function quizInit(){
    quizProgress = 0;
    startTimer();
    clearQuestionAndChoice();
    buildQuestionAndChoice(quizProgress);
}

// Function to select an answer that the user clicked
function selectAnswer(event){
    event.stopPropagation();
    event.preventDefault();
    answerChoice = event.target.getAttribute("data-value");
    answerValidation(answerChoice);
    quizProgress++;
    quizEndCheck();
    if (quizProgress !== jsQuestionsAnswers.length){
        buildQuestionAndChoice(quizProgress);
    }
}

// Function for validating answer
function answerValidation(choice){
    var questionState = quizQuestionEl.firstElementChild.getAttribute("data-state");
    var chosenAnswer = quizChoiceEl[choice].firstElementChild.getAttribute("data-state");
    compareAnswer(questionState, chosenAnswer);
}

// Function to compare question to answer
function compareAnswer(q, a){
    if (q === a){
        answerValidityEl.textContent = "Correct!";
    } else {
        answerValidityEl.textContent = "Incorrect!"
        timeRemaining -= 5; // Subtract time from the clock if answer was wrong
    }
}

// Function to check quiz end procedures
function quizEndCheck(){
    if (timeRemaining === 0){
        finalScore = timeRemaining;
        buildEndScreen();
    } else if (quizProgress === jsQuestionsAnswers.length){
        clearInterval(timeInterval);
        finalScore = timeRemaining;
        buildEndScreen();
    }
}

// Function to build quiz end screen
function buildEndScreen(){
    clearQuestionAndChoice();
    // HTML elements for end screen
    quizQuestionEl.innerHTML = "<h2>Your final score is " + finalScore + ".</h>";
    quizChoiceEl[0].innerHTML = "<label for='highscore'>Enter your initials to submit your score:</label>";
    quizChoiceEl[1].innerHTML = "<input type='text' class='initials'>";
    quizChoiceEl[2].innerHTML = "<button type='button' class='submit-score'>Submit Score!</button>";
    quizChoiceEl[3].innerHTML = "<div></div>";
    // submitScore button functionality
    // Query selectors for the buttons
    var submitScoreBtn = document.querySelector(".submit-score");
    var initials = document.querySelector(".initials");
    // Event listener for the submit button, which stringifies the initial and finalScore to the localStorage, then takes you to the high scores screen
    submitScoreBtn.addEventListener("click", () => {
        var highscoreRecord = {
            initials: initials.value,
            score: finalScore
        };
        localStorage.setItem("highscoreRecord", JSON.stringify(highscoreRecord));
        buildHighScores();
    });
}

// Function to build the high scores screen
function buildHighScores(){
    clearQuestionAndChoice();
    var leaderboard = document.createElement("p");
    var leaderboardValues = JSON.parse(localStorage.getItem("highscoreRecord"));
    var leaderboardContent = document.createTextNode(leaderboardValues.initials + " " + leaderboardValues.score)
    leaderboard.appendChild(leaderboardContent);
    mainBody.appendChild(leaderboard);
}

function exitHighScores(){
    mainBody.lastElementChild.remove();
    pageInit();
}

function pageInit(){
    quizQuestionEl.innerHTML = "<h2>Test your knowledge of Javascript with this multiple choice quiz!</h2>";
    quizChoiceEl[0].innerHTML = "<p>There will be a total of 10 questions, and you will have a time limit of 100 seconds to answer them all.</p>";
    quizChoiceEl[1].innerHTML = "<p>Every time a question is incorrectly answered, 5 seconds will be subtracted from the timer.</p>";
    quizChoiceEl[2].innerHTML = "<p>When you are finished with the quiz, your score will be equal to the time left.</p>";
    quizChoiceEl[3].innerHTML = "<p>Answer questions correctly, and aim for a high score!</p>";
    startButtonEl.innerHTML = "<button type='button' class='start'>Start Quiz!</button>"
}

pageInit()

startButtonEl.addEventListener("click", quizInit);
highScoresBtn.addEventListener("click", buildHighScores);