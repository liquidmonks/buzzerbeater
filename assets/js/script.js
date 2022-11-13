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

// Quiz Q&A ID Elements
let questionID = document.getElementById("question");
let answerKeyID = document.getElementById("answer-key");

let timerID = document.querySelector("#timer"); // Timer in Header section
let score = 0;
let spareTime; // Remaining time left after countdown
let quizDone;
timerID.innerText = 0;

// Winning Score list Array parameter
let arrayWinningScores = [];

// Array assignment for quiz questions
let arrayQuizQuestions;
let QuestionIndex = 0;
