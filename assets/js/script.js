// This code quiz shallow allow the user to start the quiz, answer questions, show the user if the question is correct or incorrect, then allow the user to enter their initials to the scoreboard

/* Global Variable Sets */

// Quiz Board Section
let quizQuestionsID = document.getElementById("quiz-questions");
let quizBoardID = document.getElementById("quiz-board");

// Quiz Over Section
let quizOverID = document.getElementById("quiz-over");
let scoreAnnounceID = document.getElementById("score-announce");
let recordInitialsID = document.getElementById("record-initials"); // Input form section

// Scoreboard Section
let scoreboardGridID = document.getElementById("scoreboard-grid");
let winnersListID = document.getElementById("winners-list");

// Header Section
let scoreboardID = document.getElementById("scoreboard");

// Quiz Key Section
let correctID = document.getElementById("correct");
let incorrectID = document.getElementById("incorrect");

// Quiz Button Elements
let btnStartGameID = document.getElementById("start-game"); // Quiz info and description section
let btnReturnID = document.getElementById("return"); // Scoreboard grid section
let btnClearScoreboardID = document.getElementById("clear-scoreboard"); // Scoreboard grid section
