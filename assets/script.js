// Global variable declaration for values to be used in the quiz
var timeRemaining; // Time left
var timeInterval; // Timer interval
var quizProgress; // What question we're currently on
var answerChoice; // A choice from 0-3
var finalScore; // The final score for the game
var currentLeaderboard; // The current leaderboard for the game

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
    timeRemaining = 100;
    timeInterval = setInterval(function(){
        if (timeRemaining !== 0){
            timeRemaining--;
            timerEl.textContent = timeRemaining;
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
    // For loop that removes all the children elements of the quiz-choice class, if they exist
    for (var i = 0; i < quizChoiceEl.length; i++){
        if (quizChoiceEl[i].firstElementChild !== null){
            quizChoiceEl[i].firstElementChild.remove();
            quizChoiceEl[i].removeEventListener("click", selectAnswer);
        }
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
    removeButtons();
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
    // If the quiz is not over, build the next question
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
        answerValidityEl.textContent = "Incorrect!";
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
    quizChoiceEl[2].innerHTML = " "
    quizChoiceEl[3].innerHTML = "<div></div>";
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "submit");
    var submitBtnText = document.createTextNode("Submit!");
    submitBtn.appendChild(submitBtnText);
    startButtonEl.appendChild(submitBtn);
    answerValidityEl.textContent = " "
    // Query selectors for score submission
    var submitScoreBtn = document.querySelector(".submit");
    var initials = document.querySelector(".initials");
    // Set the currentLeaderboard variable to localStorage's values, and turns it from a JSON string to an array
    currentLeaderboard = JSON.parse(localStorage.getItem("scoreArray")) || []; 
    // Event listener for when the submitScoreBtn is clicked
    submitScoreBtn.addEventListener("click", () => {
        var newScore = {
            score: finalScore,
            initials: initials.value
        }
        currentLeaderboard.push(newScore); // Pushes the newScore object created, into the current leaderboard
        currentLeaderboard.sort(compare); // Sorts the array so that only the top 4 scores show later
        localStorage.setItem("scoreArray", JSON.stringify(currentLeaderboard)); // Turns the currentLeaderboard back into a JSON string
        buildHighScores(); 
    })        
}

// Function to compare objects in currentLeaderboard, so they can be fed through the .sort method for leaderboard organization
function compare(a, b){
    var playerA = a.score;
    var playerB = b.score;
    var comparison = 0;
    if (playerA > playerB){
        comparison = 1;
    } else if (playerA < playerB){
        comparison = -1;
    }
    return comparison * -1;
}

// Function to build HTML for high scores section
function buildHighScores(){
    // Stops the timer in case high scores are accessed during a quiz
    clearInterval(timeInterval); 
    removeButtons();
    clearQuestionAndChoice();
    quizQuestionEl.innerHTML = "<h2>Current Leaderboard</h2>";
    // Set the currentLeaderboard variable to localStorage's values, and turns it from a JSON string to an array
    currentLeaderboard = JSON.parse(localStorage.getItem("scoreArray")) || [];
    buildLeaderboard();
    // Create HTML element for the main menu button
    var mainMenuBtn = document.createElement("button");
    mainMenuBtn.setAttribute("class", "menu");
    var mainMenuBtnText = document.createTextNode("Main Menu!");
    mainMenuBtn.appendChild(mainMenuBtnText);
    startButtonEl.appendChild(mainMenuBtn);
    mainMenuBtn.addEventListener("click", pageReInit);
    // Create HTML element for the clear leaderboard button
    var clearScoreBtn = document.createElement("button");
    clearScoreBtn.setAttribute("class", "clear");
    var clearScoreBtnText = document.createTextNode("Clear Leaderboard!");
    clearScoreBtn.appendChild(clearScoreBtnText);
    startButtonEl.appendChild(clearScoreBtn);
    clearScoreBtn.addEventListener("click", clearScore);
}

// Function for building leaderboard
function buildLeaderboard(){
    if (currentLeaderboard.length < quizChoiceEl.length){
        // For loop that populates the elements with the top 4 scores, if the currentLeaderboard is less than 4 records
        for (var i = 0; i < currentLeaderboard.length; i++){
            quizChoiceEl[i].innerHTML = "<p>" + currentLeaderboard[i].initials + currentLeaderboard[i].score + "</p>";
        }
    } else if (currentLeaderboard.length >= quizChoiceEl.length){
         // For loop that populates the elements with only the top 4 scores
         for (var i = 0; i < quizChoiceEl.length; i++){
            quizChoiceEl[i].innerHTML = "<p>" + currentLeaderboard[i].initials + currentLeaderboard[i].score + "</p>";
        }
    }
}

// Function for reinitializing the page
function pageReInit(){
    // Remove extra buttons generated from the buildHighScores function
    for (var i = 0; i <= startButtonEl.childElementCount; i++){
        startButtonEl.firstElementChild.remove();
    }
    pageInit();
}

// Function for clearing the leaderboard
function clearScore(){
    localStorage.clear();
    buildHighScores();
}

// Function for removing buttons from startButtonEl
function removeButtons(){
    // Remove generated buttons in the startButtonEl element
    for (var i = 0; i <= startButtonEl.childElementCount; i++){
        startButtonEl.firstElementChild.remove();
    }
}

// Function for page initialization
function pageInit(){
    // Create HTML elements for the description on the main menu
    quizQuestionEl.innerHTML = "<h2>Test your knowledge of Javascript with this multiple choice quiz!</h2>";
    quizChoiceEl[0].innerHTML = "<p>There will be a total of 10 questions, and you will have a time limit of 100 seconds to answer them all.</p>";
    quizChoiceEl[1].innerHTML = "<p>Every time a question is incorrectly answered, 5 seconds will be subtracted from the timer.</p>";
    quizChoiceEl[2].innerHTML = "<p>When you are finished with the quiz, your score will be equal to the time left.</p>";
    quizChoiceEl[3].innerHTML = "<p>Answer questions correctly, and aim for a high score!</p>";
    // Create HTML element for the start quiz button
    var startQuizBtn = document.createElement("button");
    startQuizBtn.setAttribute("class", "start");
    var startQuizBtnText = document.createTextNode("Start Quiz!");
    startQuizBtn.appendChild(startQuizBtnText);
    startButtonEl.appendChild(startQuizBtn);
    startQuizBtn.addEventListener("click", quizInit);
}

pageInit();

// Event listener for the high scores button
highScoresBtn.addEventListener("click", buildHighScores);