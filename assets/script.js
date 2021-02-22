// Global variable declaration for values to be used in the quiz
var timeRemaining; // Time left
var quizProgress; // What question we're currently on
var answerChoice; // A choice from 0-3

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
    buildQuestionAndChoice(quizProgress);
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
        alert("That's right!");
    } else {
        alert("Incorrect!");
        timeRemaining -= 5;
    }
}

startButtonEl.addEventListener("click", quizInit);