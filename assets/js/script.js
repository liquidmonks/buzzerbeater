// This code quiz shallow allow the user to start the quiz, answer questions, show the user if the question is correct or incorrect, then allow the user to enter their initials to the scoreboard

/* Global Variable Sets */

// Quiz Board Section
let quizQuestionsID = document.getElementById("quiz-questions");
let quizBoardID = document.getElementById("quiz-board");
let quizInfoID = document.getElementById("quiz-info");

// Quiz Over Section
let quizOverID = document.getElementById("quiz-over");
let scoreAnnounceID = document.getElementById("score-announce");
let recordInitialsID = document.getElementById("record-initials");
// Scoreboard Section
let scoreboardGridID = document.getElementById("scoreboard-grid");
let winnersListID = document.getElementById("winners-list");

// Header Section
let scoreboardID = document.getElementById("scoreboard");

// Quiz Key Section
let correctID = document.getElementById("correct");
let incorrectID = document.getElementById("incorrect");

// Quiz Button Elements
let btnStartGameID = document.getElementById("start-quiz");
let btnReturnID = document.getElementById("return");
let btnClearScoreboardID = document.getElementById("clear-scoreboard");

// Quiz Q&A ID Elements
let questionID = document.getElementById("question");
let answerKeyID = document.getElementById("answer-key");
let timerID = document.querySelector("#timer");
let score = 0;
let spareTime; // Remaining time left after countdown // New variable - no direct link to index.html
let quizDone;
timerID.innerText = 0;

// Winning Score list Array parameter
let arrayWinningScores = [];

// Array assignment for quiz questions
let arrayQuizQuestions;
let QuestionIndex = 0;

// Vriable to hold correct answer of current populated questioned
let correctAnswer;
// Sets a blank winning array
let winningArray;
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
  { q: "What characters are used to create a function body in Javascript?", a: "3. curly braces", choices: [{ choice: "1. parenthesis" }, { choice: "2. quotation marks" }, { choice: "3. curly braces" }, { choice: "4. dollar signs" }] },
  { q: "Name an application programing interface where a DOM is located?", a: "1. HTML document", choices: [{ choice: "1. HTML document" }, { choice: "2. local storage" }, { choice: "3. XLM document" }, { choice: "4. the cloud" }] },
];

/* Return to main quiz page when the user clicks on the return button from the scoreboard page */

let renderHomePage = function () {
  scoreboardGridID.classList.add("hide");
  scoreboardGridID.classList.remove("reveal");
  quizInfoID.classList.remove("hide");
  quizInfoID.classList.add("reveal");
  scoreAnnounceID.removeChild(scoreAnnounceID.lastChild);
  QuestionIndex = 0;
  quizDone = "";
  timerID.textContent = 0;
  score = 0;

  // reveal and hide values

  if ((correctID.className = "reveal")) {
    correctID.classList.remove("reveal");
    correctID.classList.add("hide");
  }
  if ((incorrectID.className = "reveal")) {
    incorrectID.classList.remove("reveal");
    incorrectID.classList.add("hide");
  }
};

// Restarts quiz at default time of 20 seconds if quizDone == true at 1 second intervals.

// Time remaining after quiz is completed
let setTime = function () {
  timeLeft = 20;

  let checkTime = setInterval(function () {
    timerID.innerText = timeLeft;
    timeLeft--;

    if (quizDone) {
      clearInterval(checkTime);
    }

    if (timeLeft < 0) {
      showScore();
      timerID.innerText = 0;
      clearInterval(checkTime);
    }
  }, 1000);
};

// Reveals and hides the Quiz from the Home Page

let startGame = function () {
  quizInfoID.classList.add("hide");
  quizInfoID.classList.remove("reveal");
  quizBoardID.classList.remove("hide");
  quizBoardID.classList.add("reveal");
  // Shuffle the questions so they show in random order
  arrayQuizQuestions = questions.sort(() => Math.random() - 0.5);
  setTime();
  setQuestion();
};

// Moves the user along to the next question

let setQuestion = function () {
  resetAnswers();
  displayQuestion(arrayQuizQuestions[QuestionIndex]);
};

// Hides the answer buttons

let resetAnswers = function () {
  while (answerKeyID.firstChild) {
    answerKeyID.removeChild(answerKeyID.firstChild);
  }
};

// Reveals questions to the user along with an answer button check
let displayQuestion = function (index) {
  questionID.innerText = index.q;
  for (const element of index.choices) {
    // for of loop to iterate through the choices array and create a button for each choice in the array
    let answerKey = document.createElement("button");
    answerKey.innerText = element.choice;
    answerKey.classList.add("btn");
    answerKey.classList.add("answerBtn");
    answerKey.addEventListener("click", answerCheck);
    answerKeyID.appendChild(answerKey);

    // Assigns correct answer to the variable
    correctAnswer = index.a;
  }
};

// This function checks if clicked answer is correct and call appropriate function accordingly.
let answerCheck = function (event) {
  let target = event.target || event.srcElement;
  if (target.innerHTML == correctAnswer) {
    answerCorrect();
  } else {
    answerIncorrect();
  }
  moveNext();
};

// Reveals correct! on the screen after the user chooses the correct answer

let answerCorrect = function () {
  score++;
  if ((correctID.className = "hide")) {
    correctID.classList.remove("hide");
    correctID.classList.add("banner");
    incorrectID.classList.remove("banner");
    incorrectID.classList.add("hide");
  }
};

// Reveals incorrect! on screen after the user chooses the incorrect answer

let answerIncorrect = function () {
  if ((incorrectID.className = "hide")) {
    incorrectID.classList.remove("hide");
    incorrectID.classList.add("banner");
    correctID.classList.remove("banner");
    correctID.classList.add("hide");
  }
};

// Moves the quiz page to the next question then checks for remaining questions
let moveNext = function () {
  QuestionIndex++;
  if (questions.length > QuestionIndex + 1) {
    setQuestion();
  } else {
    if (score > 0) {
      score = score + timeLeft;
    }
    quizDone = "true";
    showScore();
    // Resets questions to 0
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
  event.preventDefault();
  let initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your initials!");
    return;
  }

  recordInitialsID.reset();

  let WinningScore = {
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
  winningArray = arrayWinningScores;
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

// Reveals questions and answer buttons
let sortWinningScore = function () {
  for (const element of arrayWinningScores) {
    // For...of loop that runs the body of the loop for every element in the iterable object
    if (element != undefined) {
      let highScoreID = document.createElement("li");
      highScoreID.ClassName = "winners-score";
      highScoreID.innerHTML = element.initials + " - " + element.score;
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
  let LoadedWinningScores = localStorage.getItem("winningScores");
  if (!LoadedWinningScores) {
    return false;
  }

  LoadedWinningScores = JSON.parse(LoadedWinningScores);
  LoadedWinningScores.sort((a, b) => {
    return b.score - a.score;
  });
  winnersListID.innerHTML = "";
  for (const element of LoadedWinningScores) {
    // For...of loop that runs the body of the loop for every element in the iterable object
    let highScoreID = document.createElement("li");
    highScoreID.ClassName = "winners-score";
    highScoreID.innerText = element.initials + " - " + element.score;
    winnersListID.appendChild(highScoreID);
    arrayWinningScores.push(element);
  }
};

// Displays the winning score from the Winner's Circle page when link is clicked or initials are entered

let displayWinningScores = function () {
  quizInfoID.classList.remove("reveal");
  quizInfoID.classList.add("hide");
  quizDone = "true";

  if ((quizOverID.className = "reveal")) {
    quizOverID.classList.remove("reveal");
    quizOverID.classList.add("hide");
  }
  if ((quizBoardID.className = "reveal")) {
    quizBoardID.classList.remove("reveal");
    quizBoardID.classList.add("hide");
  }

  if ((quizBoardID.className = "reveal")) {
    quizBoardID.classList.remove("reveal");
    quizBoardID.classList.add("hide");
  }

  if ((correctID.className = "reveal")) {
    correctID.classList.remove("reveal");
    correctID.classList.add("hide");
  }

  if ((incorrectID.className = "reveal")) {
    incorrectID.classList.remove("reveal");
    incorrectID.classList.add("hide");
  }
  if ((scoreboardGridID.className = "hide")) {
    scoreboardGridID.classList.remove("hide");
    scoreboardGridID.classList.add("reveal");
  }
};

// Clears the high scores from the Winner's Circle

let clearScores = function () {
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
