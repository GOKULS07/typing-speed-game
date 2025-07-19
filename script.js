const quotes = [
  "Typing fast is a superpower in the digital age.",
  "Practice makes perfect, even for typing speed.",
  "JavaScript is fun when you get the hang of it.",
  "Front-end development is all about creativity.",
  "Stay focused and type with precision."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let currentQuote = "";
let timeLeft = 60;
let timer;
let isRunning = false;
let score = 0;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function loadQuote() {
  currentQuote = getRandomQuote();
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.focus();
}

function startGame() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      updateWPM();
      if (timeLeft <= 0) {
        clearInterval(timer);
        inputEl.disabled = true;
        quoteEl.textContent = "⏱️ Time’s up!";
      }
    }, 1000);
  }
}

function updateWPM() {
  const wordsTyped = score * currentQuote.split(" ").length;
  const minutes = (60 - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  wpmEl.textContent = wpm;
}

inputEl.addEventListener("input", () => {
  startGame();

  const typedText = inputEl.value;
  const isCorrect = currentQuote.startsWith(typedText);

  inputEl.classList.remove("correct", "incorrect");
  if (typedText === currentQuote) {
    score++;
    scoreEl.textContent = score;
    loadQuote();
  } else {
    inputEl.classList.add(isCorrect ? "correct" : "incorrect");
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 60;
  isRunning = false;
  score = 0;
  inputEl.disabled = false;
  timeEl.textContent = "60";
  wpmEl.textContent = "0";
  scoreEl.textContent = "0";
  loadQuote();
  inputEl.classList.remove("correct", "incorrect");
});

loadQuote();
