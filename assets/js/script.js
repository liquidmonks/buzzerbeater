// This code quiz shallow allow the user to start the quiz, answer questions, show the user if the question is correct or incorrect, then allow the user to enter their initials to the scoreboard

/* Global Variable Sets */

// Quiz Board Section
let quizQuestionsID = document.getElementById("quiz-questions"); // LINE 42: <div class="quiz-questions">
let quizBoardID = document.getElementById("quiz-board"); // LINE 41: <div id="quiz-board" class="hide">
let quizInfoID = document.getElementById("quiz-info"); // LINE 25: <div id="quiz-info" class="reveal">

// Quiz Over Section
let quizOverID = document.getElementById("quiz-over"); // LINE 49: <div id="quiz-over" class="hide">
let scoreAnnounceID = document.getElementById("score-announce"); // LINE 51: <div id="score-announce">
let recordInitialsID = document.getElementById("record-initials"); // Input form section

// Scoreboard Section
let scoreboardGridID = document.getElementById("scoreboard-grid"); // LINE 66: <div id="scoreboard-grid" class="hide">
let winnersListID = document.getElementById("winners-list"); // LINE 51: <div id="score-announce">

// Header Section
let scoreboardID = document.getElementById("scoreboard"); // LINE 15:  <h2 id="scoreboard">High Scores</h2>

// Quiz Key Section
let correctID = document.getElementById("correct"); // LINE 80: <div class="hide" id="correct">
let incorrectID = document.getElementById("incorrect"); // LINE 85: <div class="hide" id="incorrect">

// Quiz Button Elements
let btnStartGameID = document.getElementById("start-quiz"); // LINE 35: <button class="btn-over" id="start-quiz">Let's Go!</button>
let btnReturnID = document.getElementById("return"); // LINE 71: <button class="btn" id="return">Return To Quiz</button>
let btnClearScoreboardID = document.getElementById("clear-scoreboard"); // LINE 72: <button class="btn" id="clear-scoreboard">Clear Scoreboard</button>

// Quiz Q&A ID Elements
let questionID = document.getElementById("question"); // LINE 43: <div id="question"></div>
let answerKeyID = document.getElementById("answer-key"); // LINE 44: <div id="answer-key" class="btn-board"></div>

let timerID = document.querySelector("#timer"); // LINE 16: <h2 class="countdown">Countdown: <span id="timer"></span></h2>
let score = 0; // New variable - no direct link to index.html
let spareTime; // Remaining time left after countdown // New variable - no direct link to index.html
let quizDone; // New variable - no direct link to index.html
timerID.innerText = 0; // LINE 16: <h2 class="countdown">Countdown: <span id="timer"></span></h2>

// Winning Score list Array parameter
let arrayWinningScores = [];

// Array assignment for quiz questions
let arrayQuizQuestions;
let QuestionIndex = 0;

// new __ variable to hold correct answer of current populated questioned
let correctAnswer;
//new__ blank winning array
let winningarray;
// Array set for Quiz Questions

let questions = [
  {
    q: "What are variables in Javascript?",
    a: "1. values that change within a program.",
    choices: [{ choice: "1. values that change within a program." }, { choice: "2. methods" }, { choice: "3. objects" }, { choice: "4. trick question, there is no such thing." }],
  },
  { q: "What are data types?", a: "4. all of the above", choices: [{ choice: "1. integer" }, { choice: "2. string" }, { choice: "3. boolean" }, { choice: "4. all of the above" }] },
  { q: "What is the formula to check if a number is even?", a: "2. num % 2 == 0", choices: [{ choice: "1. num * .5 == 0" }, { choice: "2. num % 2 == 0" }, { choice: "3. num % num = 2" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What year was CSS awarded the top coding prize in the Silicon Valley Coding Awards?", a: "4. trick question, there is no such thing.", choices: [{ choice: "1. 2010" }, { choice: "2. 1995" }, { choice: "3. 2018" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What HTML tag did NASA astronauts carve on a moon rock?", a: "4. trick question, there is no such thing.", choices: [{ choice: "1. <h1>" }, { choice: "2. <p>" }, { choice: "3. <option>" }, { choice: "4. trick question, there is no such thing." }] },
  { q: "What characters are used to create a function body in Javascript?", a: "3. curly braces", choices: [{ choice: "1. parenthesis" }, { choice: "2. quotation marks" }, { choice: "3. Curly braces" }, { choice: "4. dollar signs" }] },
  { q: "Name an application programing interface where a DOM is located?", a: "1. HTML document", choices: [{ choice: "1. HTML document" }, { choice: "2. local storage" }, { choice: "3. XLM document" }, { choice: "4. the cloud" }] },
];

/* Return to main quiz page when the user clicks on the return button from the scoreboard page */

let renderHomePage = function () {
  scoreboardGridID.classList.remove("erveal"); // LINE 80: <div class="hide" id="correct">
  scoreboardGridID.classList.add("hide"); // LINE 80: <div class="hide" id="correct">
  quizInfoID.classList.add("hide"); // LINE 25: <div id="quiz-info" class="reveal">
  quizInfoID.classList.remove("reveal"); // LINE 25: <div id="quiz-info" class="reveal">
  quizBoardID.classList.remove("hide"); // LINE 41: <div id="quiz-board" class="hide">
  quizBoardID.classList.add("reveal"); // LINE 41: <div id="quiz-board" class="hide">
  scoreAnnounceID.innerHTML = ""; // LINE 51: <div id="score-announce">
  QuestionIndex = 0;
  quizDone = ""; // New variable - no direct link to index.html
  timerID.textContent = 0; // LINE 16: <h2 class="countdown">Countdown: <span id="timer"></span></h2>
  score = 0; // New variable - no direct link to index.html

  // reveal and hide values

  if ((correctID.className = "reveal")) {
    // LINE 80: <div class="hide" id="correct">
    correctID.classList.remove("reveal"); // LINE 80: <div class="hide" id="correct">
    correctID.classList.add("hide"); // LINE 80: <div class="hide" id="correct">
  }
  if ((incorrectID.className = "reveal")) {
    // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.remove("reveal"); // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.add("hide"); // LINE 85: <div class="hide" id="incorrect">
  }
};

// Restarts quiz at default time of 20 seconds if quizDone == true at 1 second intervals.

//new__ change all sparetime to timeleft
let setTime = function () {
  timeleft = 20;

  let checkTime = setInterval(function () {
    timerID.innerText = timeleft;
    timeleft--;

    if (quizDone) {
      clearInterval(checkTime);
    }

    if (timeleft < 0) {
      showScore();
      timerID.innerText = 0;
      clearInterval(checkTime);
    }
  }, 1000);
};

// Reveals and hides the Quiz from the Home Page

let startGame = function () {
  // Reveals and hides the quiz from the home page.
  quizInfoID.classList.add("hide"); // LINE 25: <div id="quiz-info" class="reveal">
  quizInfoID.classList.remove("reveal"); // LINE 25: <div id="quiz-info" class="reveal">
  quizBoardID.classList.remove("hide"); // LINE 41: <div id="quiz-board" class="hide">
  quizBoardID.classList.add("reveal"); // LINE 41: <div id="quiz-board" class="hide">
  //Shuffle the questions so they show in random order
  arrayQuizQuestions = questions.sort(() => Math.random() - 0.5); // New variable - no direct link to index.html
  setTime(); // New variable - no direct link to index.html
  setQuestion(); // New variable - no direct link to index.html
};

// Moves the user along to the next question

let setQuestion = function () {
  // New variable - no direct link to index.html
  resetAnswers(); // New variable - no direct link to index.html
  displayQuestion(arrayQuizQuestions[QuestionIndex]); // New variable - no direct link to index.html
};

// Hides the answer buttons

let resetAnswers = function () {
  // New variable - no direct link to index.html
  while (answerKeyID.firstChild) {
    answerKeyID.removeChild(answerKeyID.firstChild);
  }
};

// Reveals questions to the user along with an answer button check
let displayQuestion = function (index) {
  questionID.innerText = index.q;
  for (let i = 0; i < index.choices.length; i++) {
    let answerKey = document.createElement("button");
    answerKey.innerText = index.choices[i].choice;
    answerKey.classList.add("btn");
    answerKey.classList.add("answerbtn");
    answerKey.addEventListener("click", answerCheck);
    answerKeyID.appendChild(answerKey);

    // new__ assigning correct answer to the variable
    correctAnswer = index.a;
  }
};

// This function checks if clicked answer is correct and call appropriate function accordingly.
let answerCheck = function (event) {
  var target = event.target || event.srcElement;
  if (target.innerHTML == correctAnswer) {
    answerCorrect();
  } else {
    answerIncorrect();
  }
  movenext();
};

// Reveals correct! on the screen after the user chooses the correct answer

let answerCorrect = function () {
  // New variable - no direct link to index.html
  score++;
  if ((correctID.className = "hide")) {
    // LINE 80: <div class="hide" id="correct">
    correctID.classList.remove("hide"); // LINE 80: <div class="hide" id="correct">
    correctID.classList.add("banner"); // LINE 80: <div class="hide" id="correct">
    incorrectID.classList.remove("banner"); // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.add("hide"); // LINE 85: <div class="hide" id="incorrect">
  }
};

// Reveals incorrect! on screen after the user chooses the incorrect answer

let answerIncorrect = function () {
  if ((incorrectID.className = "hide")) {
    // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.remove("hide"); // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.add("banner"); // LINE 85: <div class="hide" id="incorrect">
    correctID.classList.remove("banner"); // LINE 80: <div class="hide" id="correct">
    correctID.classList.add("hide"); // LINE 80: <div class="hide" id="correct">
  }
};

// Moves the quiz page to the next question then checks for remaining questions
let movenext = function () {
  QuestionIndex++;
  if (questions.length > QuestionIndex + 1) {
    setQuestion();
  } else {
    if (score > 0) {
      score = score + timeleft;
    }
    quizDone = "true";
    showScore();
    //new__ setback questions to 0
    QuestionIndex = 0;
  }
};

// Reveals the total score on the screen when the quiz is complete

let showScore = function () {
  quizBoardID.classList.add("hide");
  quizOverID.classList.remove("hide");
  quizOverID.classList.add("reveal");

  let scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = "Your quiz score is " + score + "!";
  scoreAnnounceID.appendChild(scoreDisplay);
};

// Tabulates the high score values

let createHighScore = function (event) {
  // New variable - no direct link to index.html
  event.preventDefault();
  let initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your initials!");
    return;
  }

  recordInitialsID.reset();

  let WinningScore = {
    // New variable - no direct link to index.html
    initials: initials,
    score: score,
  };
  winningScores(WinningScore);
  displayWinningScores();
};

// This function matches and adopts to the situation
let winningScores = function (WinningScore) {
  // Pushes and sorts winning scores
  arrayWinningScores.push(WinningScore);
  arrayWinningScores.sort((a, b) => {
    return b.score - a.score;
  });
  sortWinningScore();
  winningarray = arrayWinningScores;
  saveWinningScore();
  loadWinningScore();
  return arrayWinningScores;
};

// Clears the winning score from the Winner's Circle

let clearWinningScore = function () {
  while (winnersListID.firstChild) {
    winnersListID.removeChild(winnersListID.firstChild);
  }
};

// Creates winning scores from highest to lowest in the Winner's Circle

//new__ removed for loop from this section
let sortWinningScore = function () {
  for (let i = 0; i < arrayWinningScores.length; i++) {
    if (arrayWinningScores[i] != undefined) {
      var highScoreID = document.createElement("li");
      highScoreID.ClassName = "winners-score";
      highScoreID.innerHTML = arrayWinningScores[i].initials + " - " + arrayWinningScores[i].score;
      winnersListID.appendChild(highScoreID);
    }
  }
};

let clearFields = function () {};
// Saves the winning score

let saveWinningScore = function () {
  // New variable - no direct link to index.html
  localStorage.setItem("winningScores", JSON.stringify(arrayWinningScores));
};

// Loads variable values when the webpage loads

let loadWinningScore = function () {
  // New variable - no direct link to index.html
  var LoadedWinningScores = localStorage.getItem("winningScores");
  if (!LoadedWinningScores) {
    return false;
  }

  LoadedWinningScores = JSON.parse(LoadedWinningScores);
  LoadedWinningScores.sort((a, b) => {
    return b.score - a.score;
  });
  winnersListID.innerHTML = "";
  for (let i = 0; i < LoadedWinningScores.length; i++) {
    let highscoreID = document.createElement("li");
    highscoreID.ClassName = "winners-score";
    highscoreID.innerText = LoadedWinningScores[i].initials + " - " + LoadedWinningScores[i].score;
    winnersListID.appendChild(highscoreID);
    arrayWinningScores.push(LoadedWinningScores[i]);
  }
  // displayWinningScores();
};

// Displays the winning score from the Winner's Circle page when link is clicked or initials are entered

let displayWinningScores = function () {
  // New variable - no direct link to index.html
  // quizInfoID.classList.remove("hide");
  quizInfoID.classList.add("hide");
  quizDone = "true";

  if ((quizOverID.className = "reveal")) {
    // LINE 49: <div id="quiz-over" class="hide">
    quizOverID.classList.remove("reveal"); // LINE 49: <div id="quiz-over" class="hide">
    quizOverID.classList.add("hide"); // LINE 49: <div id="quiz-over" class="hide">
  }
  if ((quizBoardID.className = "reveal")) {
    // LINE 41: <div id="quiz-board" class="hide">
    quizBoardID.classList.remove("reveal"); // LINE 41: <div id="quiz-board" class="hide">
    quizBoardID.classList.add("hide"); // LINE 41: <div id="quiz-board" class="hide">
  }

  if ((quizBoardID.className = "reveal")) {
    // LINE 41: <div id="quiz-board" class="hide">
    quizBoardID.classList.remove("reveal"); // LINE 41: <div id="quiz-board" class="hide">
    quizBoardID.classList.add("hide"); // LINE 41: <div id="quiz-board" class="hide">
  }

  if ((correctID.className = "reveal")) {
    // LINE 80: <div class="hide" id="correct">
    correctID.classList.remove("reveal"); // LINE 80: <div class="hide" id="correct">
    correctID.classList.add("hide"); // LINE 80: <div class="hide" id="correct">
  }

  if ((incorrectID.className = "reveal")) {
    // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.remove("reveal"); // LINE 85: <div class="hide" id="incorrect">
    incorrectID.classList.add("hide"); // LINE 85: <div class="hide" id="incorrect">
  }
  if ((scoreboardGridID.className = "hide")) {
    scoreboardGridID.classList.remove("hide"); // LINE 80: <div class="hide" id="correct">
    scoreboardGridID.classList.add("reveal"); // LINE 80: <div class="hide" id="correct">
  }
};

// Clears the high scores from the Winner's Circle

let clearScores = function () {
  // New variable - no direct link to index.html
  winningScores = [];

  while (winnersListID.firstChild) {
    winnersListID.removeChild(winnersListID.firstChild);
  }

  localStorage.clear(winningScores);
  location.reload();
};

loadWinningScore();

// Starts quiz when user clicks Let's Go!
btnStartGameID.addEventListener("click", startGame);
// Records initials when user clicks submit button or hits Enter key on keyboard
recordInitialsID.addEventListener("submit", createHighScore);
// When user clicks on High Scores from quiz home page
winnersListID.addEventListener("click", displayWinningScores);
// When user clicks on the return button
btnReturnID.addEventListener("click", renderHomePage);
// When user clicks on the clear scores button
btnClearScoreboardID.addEventListener("click", clearScores);
scoreboardID.addEventListener("click", displayWinningScores);
