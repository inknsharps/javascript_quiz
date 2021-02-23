# Javascript Quiz

This is a multiple choice quiz web application that tests your knowledge on Javascript. Play a deployed version <a href="https://inknsharps.github.io/javascript_quiz/">here</a>!

## Gameplay Description

Users can challenge their knowledge of Javascript by playing through this quiz. When the game starts, a timer ticks down from 50 seconds, and the user will need to answer all the questions in the given time. When the user clicks an answer, a message will appear showing if they've answered correct;y or incorrectly. If a question was answered incorrectly, the timer will decrease by 5 seconds, so make sure to answer carefully! 

Once the questions are complete, or the timer hits 0, a game end screen will appear where the user can submit their score to the leaderboard. At the leaderboard, the user can choose to return to the main menu and play the quiz again.

## Features

* One click buttons to navigate through the menus, to initialize the quiz, to select an answer, and submit a score.
* Persistent high score leaderboards through use of the the `Window.localStorage` object, which can be cleared if desired.
* High score leaderboards automatically sort through the submitted scores, and only display the top 4 scores.
* Randomly generated backgrounds every time you run the app!

## Credits

* Questions and answers from the <a href="https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm">Tutorials Point Javascript Website</a>.
* CSS reset file based off of the <a href="https://github.com/hankchizljaw/modern-css-reset">Modern CSS reset</a> by Andy Bell/hankchizljaw.
* <a href="https://p5js.org">p5.js</a>, which was used to code the generated background effects.