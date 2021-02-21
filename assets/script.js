// Global variable declaration for values to be used in the quiz
var timeRemaining;

// Question and answers variable
// Answers are used as an array for future methods, as well as adding innerHTML data
var jsQuestionsAnswers = [
    {
        question: "<h2 data-state='correct'>Which of the following is correct about features of JavaScript?</h2>",
        answers: [
            "<button type='button' data-state='incorrect'>JavaScript is a lightweight, interpreted programming language.</button>",
            "<button type='button' data-state='incorrect'>JavaScript is designed for creating network-centric applications.</button>",
            "<button type='button' data-state='incorrect'>JavaScript is complementary to and integrated with Java.</button>",
            "<button type='button' data-state='correct'>All of the above.</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Which of the following is the correct syntax to print a page using JavaScript?</h2>",
        answers: [
            "<button type='button' data-state='correct'>window.print();</button>",
            "<button type='button' data-state='incorrect'>browser.print();</button>",
            "<button type='button' data-state='incorrect'>navigator.print();</button>",
            "<button type='button' data-state='incorrect'>document.print();</button>"
        ]
    },
]

// Query Selectors for elements on the page
var highScoresBtn = document.querySelector(".high-scores");
var timerEl = document.querySelector(".time-left");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizChoiceEl = document.querySelectorAll(".quiz-choice");
var startButtonEl = document.querySelector(".start");

// Function for timer
function startTimer(){
    timeRemaining = 10;
    var timeInterval = setInterval(function(){
        if (timeRemaining !== 0){
            timerEl.textContent = timeRemaining;
            timeRemaining--;
        } else {
            clearInterval(timeInterval);
            timerEl.textContent = "Time's up!";
        }
    }, 1000);
}

// Function to remove the start button, question and answer choices
function clearQuestionAndChoice(){
    quizQuestionEl.firstElementChild.remove();
    startButtonEl.remove();
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].firstElementChild.remove();
    }
}

// Function to build a question and answer choices
function buildQuestionAndChoice(questionNum){
    quizQuestionEl.innerHTML = jsQuestionsAnswers[questionNum].question;
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].innerHTML = jsQuestionsAnswers[questionNum].answers[i];
    }
}