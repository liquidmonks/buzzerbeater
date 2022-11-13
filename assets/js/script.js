// This code quiz shallow allow the user to start the quiz, answer questions, show the user if the question is correct or incorrect, then allow the user to enter their initials to the scoreboard

/* Global Variable Sets */

// Quiz Board Section
let quizQuestionsID = document.getElementById("quiz-questions");
let quizInfoID = document.getElementById("quiz-info");
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

// Array set for Quiz Questions

let questions = [
  { q: "What are variables in Javascript?", a: "1. values that change within a program.", choices: [{ choice: "1. values that change within a program." }, { choice: "2. methods" }, { choice: "3. objects" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What are data types?", a: "4. all of the above", choices: [{ choice: "1. integer" }, { choice: "2. string" }, { choice: "3. boolean" }, { choice: "4. all of the above" }] },
  { q: "What is the formula to check if a number is even?", a: "2. num % 2 == 0", choices: [{ choice: "1. num * .5 == 0" }, { choice: "2. num % 2 == 0" }, { choice: "3. num % num = 2" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What year was CSS awarded the top coding prize in the Silicon Valley Coding Awards?", a: "4. trick question, there is no such thing.", choices: [{ choice: "1. 2010" }, { choice: "2. 1995" }, { choice: "3. 2018" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What HTML tag did NASA astronauts carve on a moon rock?", a: "4. trick question, there is no such thing.", choices: [{ choice: "1. <h1>" }, { choice: "2. <p>" }, { choice: "3. <option>" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What characters are used to create a function body in Javascript?", a: "3. curly braces", choices: [{ choice: "1. parenthesis" }, { choice: "2. quotation marks" }, { choice: "3. Curly braces" }, { choice: "4. dollar signs" }] },
  { q: "Name an application programing interface where a DOM is located?", a: "1. HTML document", choices: [{ choice: "1. HTML document" }, { choice: "2. local storage" }, { choice: "3. XLM document" }, { choice: "4. the cloud" }] },
];
