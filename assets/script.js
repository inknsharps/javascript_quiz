// Global variable declaration for values to be used in the quiz
var timeRemaining; // Time left
var timeInterval; // Timer interval
var quizProgress; // What question we're currently on
var answerChoice; // A choice from 0-3
var finalScore; // The final score for the game
var currentLeaderboard; // The current leaderboard for the game
var initials; // The name entry value when submitting a score

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
            "<button type='button' data-value='0' data-state='correct'>window.print()</button>",
            "<button type='button' data-value='1' data-state='incorrect'>browser.print()</button>",
            "<button type='button' data-value='2' data-state='incorrect'>navigator.print()</button>",
            "<button type='button' data-value='3' data-state='incorrect'>document.print()</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Which of the following type of variable takes precedence over other if names are same?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>Global variable</button>",
            "<button type='button' data-value='1' data-state='correct'>Local variable</button>",
            "<button type='button' data-value='2' data-state='incorrect'>Both of the above.</button>",
            "<button type='button' data-value='3' data-state='incorrect'>None of the above.</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Which built-in method returns the string representation of the number's value?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>toValue()</button>",
            "<button type='button' data-value='1' data-state='incorrect'>toNumber()</button>",
            "<button type='button' data-value='2' data-state='correct'>toString()</button>",
            "<button type='button' data-value='3' data-state='incorrect'>None of the above.</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Which of the following function of String object returns the character at the specified index?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='correct'>charAt()</button>",
            "<button type='button' data-value='1' data-state='incorrect'>charCodeAt()</button>",
            "<button type='button' data-value='2' data-state='incorrect'>concat()</button>",
            "<button type='button' data-value='3' data-state='incorrect'>indexOf()</button>"
        ]
    }
]

// Query Selectors for elements on the page
var mainBody = document.querySelector(".main");
var highScoresBtn = document.querySelector(".high-scores");
var timerEl = document.querySelector(".time-left");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizChoiceEl = document.querySelectorAll(".quiz-choice");
var startButtonEl = document.querySelector(".start-button");
var answerValidityEl = document.querySelector(".answer-validity");

// Function to initialize the quiz
function quizInit(){
    quizProgress = 0;
    startTimer();
    removeButtons();
    clearQuestionAndChoice();
    buildQuestionAndChoice(quizProgress);
}

// Function for timer
function startTimer(){
    timeRemaining = 50;
    timeInterval = setInterval(() => {
        if (timeRemaining > 0){
            timeRemaining--;
            timerEl.textContent = timeRemaining;
        } else {
            clearInterval(timeInterval);
            timerEl.textContent = timeRemaining;
            quizEndCheck();
        }
    }, 1000);
}

// Function to check quiz end procedures
function quizEndCheck(){
    // If the time hits 0 or less, or if quizProgress is equal to the jsQuestionsAnswers array length (meaning all the questions have been answered), end the quiz
    if (timeRemaining <= 0){
        finalScore = timeRemaining;
        buildEndScreen();
    } else if (quizProgress === jsQuestionsAnswers.length){
        clearInterval(timeInterval);
        finalScore = timeRemaining;
        buildEndScreen();
    }
}

// Function to remove the start button, question and answer choices
function clearQuestionAndChoice(){
    // Remove the question element children
    quizQuestionEl.firstElementChild.remove();
    // For loop that removes all the children elements of the quiz-choice class, if they exist
    for (var i = 0; i < quizChoiceEl.length; i++){
        if (quizChoiceEl[i].firstElementChild !== null){
            quizChoiceEl[i].firstElementChild.removeEventListener("click", selectAnswer);
            quizChoiceEl[i].firstElementChild.remove();
        }
    }
}

// Function to build a question and answer choices, as well as adds click event listeners for answer selection
function buildQuestionAndChoice(questionNum){
    // Populates the question element with a queestion from jsQuestionsAnswers
    quizQuestionEl.innerHTML = jsQuestionsAnswers[questionNum].question;
    // For loop that adds the questions as children to the quiz-choice class
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].innerHTML = jsQuestionsAnswers[questionNum].answers[i];
        quizChoiceEl[i].firstElementChild.addEventListener("click", selectAnswer);
    }
}

// Function for removing buttons from startButtonEl
function removeButtons(){
    // If startButtonEl has something...
    if (startButtonEl.firstElementChild !== null){
        // ...Remove those elements in the startButtonEl element
        for (var i = 0; i <= startButtonEl.childElementCount; i++){
            startButtonEl.firstElementChild.remove();
        }
    }
}

// Function to build a button element with class, text content, and function parameters
function buildButton(cla, txt, func){
    cla = document.createElement("button");
    cla.setAttribute("class", cla);
    txt = document.createTextNode(txt);
    cla.appendChild(txt);
    startButtonEl.appendChild(cla);
    cla.addEventListener("click", func);
}

// Function to select an answer that the user clicked
function selectAnswer(event){
    event.stopPropagation();
    event.preventDefault();
    // Declare variable for the button the user clicked, which should equal to the "data-value" attribute of that button
    answerChoice = event.target.getAttribute("data-value");
    // Call answerValidation(), which inputs the answerChoice variable into the function
    answerValidation(answerChoice);
    quizProgress++;
    quizEndCheck();
    // If the quiz is not over, build the next question
    if (quizProgress !== jsQuestionsAnswers.length){
        buildQuestionAndChoice(quizProgress);
    }
}

// Function for validating chosen answer
function answerValidation(choice){
    // Declare variables for the question and answer's "data-state" attribute (which would be either correct or incorrect)
    var questionState = quizQuestionEl.firstElementChild.getAttribute("data-state");
    var answerState = quizChoiceEl[choice].firstElementChild.getAttribute("data-state");
    compareAnswer(questionState, answerState);
}

// Function to compare the "data-state" attributes between the question and answer
function compareAnswer(q, a){
    if (q === a){
        flashMessage("Correct!");
    } else {
        flashMessage("Incorrect!");
        timeRemaining -= 5; // Subtract time from the clock if answer was wrong
    }
}

 // Function to quickly display a message and remove it
function flashMessage(message){
    var flashTimer = 4;
    var flashInterval = setInterval(() => {
        if (flashTimer !== 0){
            flashTimer--;
            answerValidityEl.textContent = message;
        } else {
            clearInterval(flashInterval);
            answerValidityEl.textContent = " ";
        }
    }, 250);
}

// Function to build quiz end screen
function buildEndScreen(){
    clearQuestionAndChoice();
    // HTML elements for end screen
    quizQuestionEl.innerHTML = "<h2>Your final score is " + finalScore + ".</h>";
    quizChoiceEl[0].innerHTML = "<label for='highscore'>Enter your name or initials to submit your score:</label>";
    quizChoiceEl[1].innerHTML = "<input type='text' class='initials'>";
    quizChoiceEl[2].innerHTML = " ";
    quizChoiceEl[3].innerHTML = " ";
    quizChoiceEl[1].firstElementChild.focus(); // Focuses on the empty input field for accessibility
    buildButton("submit", "Submit Score!", submitScore);
    answerValidityEl.textContent = " ";
    // Query selector for name submission input tag
    initials = document.querySelector(".initials");
    // Set the currentLeaderboard variable to localStorage's values, and turns it from a JSON string to an array
    currentLeaderboard = JSON.parse(localStorage.getItem("scoreArray")) || []; 
}

// Function to submit a score
function submitScore(){
    var newScore = {
        score: finalScore,
        name: initials.value
    }
    // If statement in case the user doesn't input a name but submits a score, generates a random anonymous animal name
    if (initials.value === ""){
        var anonymousAnimals = ["Alligator", "Bear", "Chinchilla", "Duck", "Elephant", "Frog", "Giraffe", "Hippo", "Jackal", "Ibex", "Koala", "Llama", "Manatee", "Narwhal", "Otter", "Panda", "Quokka", "Squirrel", "Turtle", "Unicorn", "Walrus"]
        newScore.name = "Anonymous " + anonymousAnimals[Math.floor(Math.random()*anonymousAnimals.length)];
    }
    currentLeaderboard.push(newScore); // Pushes the newScore object created, into the current leaderboard
    currentLeaderboard.sort(compareHighScore); // Sorts the array so that only the top 4 scores show later
    localStorage.setItem("scoreArray", JSON.stringify(currentLeaderboard)); // Turns the currentLeaderboard back into a JSON string
    buildHighScores(); 
}

// Function to compare objects in currentLeaderboard, so they can be fed through the .sort method for leaderboard organization
function compareHighScore(a, b){
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
    // Create HTML button element for the main menu button
    buildButton("menu", "Main Menu!", pageReInit);
    // Create HTML button element for the clear leaderboard button
    buildButton("clear", "Clear Leaderboard!", clearScore);
}

// Function for building leaderboard
function buildLeaderboard(){
    if (currentLeaderboard.length < quizChoiceEl.length){
        // For loop that populates the elements with the top 4 scores, if the currentLeaderboard is less than 4 records
        for (var i = 0; i < currentLeaderboard.length; i++){
            quizChoiceEl[i].innerHTML = "<p>" + currentLeaderboard[i].name + " " + currentLeaderboard[i].score + "</p>";
        }
    } else if (currentLeaderboard.length >= quizChoiceEl.length){
        // For loop that populates the elements with only the top 4 scores
        for (var i = 0; i < quizChoiceEl.length; i++){
            quizChoiceEl[i].innerHTML = "<p>" + currentLeaderboard[i].name + " " + currentLeaderboard[i].score + "</p>";
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

// Function for page initialization
function pageInit(){
    // Create HTML elements for the description on the main menu
    quizQuestionEl.innerHTML = "<h2>Test your knowledge of Javascript with this multiple choice quiz!</h2>";
    quizChoiceEl[0].innerHTML = "<p>There will be a total of 5 questions, and you will have a time limit of 50 seconds to answer them all.</p>";
    quizChoiceEl[1].innerHTML = "<p>Every time a question is incorrectly answered, 5 seconds will be subtracted from the timer.</p>";
    quizChoiceEl[2].innerHTML = "<p>When you are finished with the quiz, your score will be equal to the time left.</p>";
    quizChoiceEl[3].innerHTML = "<p>Answer questions correctly, and aim for a high score!</p>";
    // Create HTML element for the start quiz button
    buildButton("start", "Start Quiz!", quizInit);
}

pageInit();

// Event listener for the high scores button
highScoresBtn.addEventListener("click", buildHighScores);