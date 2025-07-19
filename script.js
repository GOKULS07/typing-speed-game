const quotes = [
  "Typing fast is a superpower in the digital age.",
  "JavaScript is fun when you get the hang of it.",
  "Practice makes perfect in everything you do.",
  "Stay focused and type with precision.",
  "Web developers turn coffee into websites.",
  "Write code. Debug. Repeat.",
  "The best way to learn is by building."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const wpmEl = document.getElementById("wpm");
const resetBtn = document.getElementById("reset");

let currentQuote = "";
let score = 0;
let timeLeft = 60;
let totalTypedWords = 0;
let isGameRunning = false;
let intervalId = null;

// Load a new quote
function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.classList.remove("correct", "incorrect");
}

// Start game timer
function startTimer() {
  if (isGameRunning) return;

  isGameRunning = true;
  intervalId = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    updateWPM();
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      inputEl.disabled = true;
      quoteEl.textContent = "⏰ Time's up! Game over.";
    }
  }, 1000);
}

// Check typing input
inputEl.addEventListener("input", () => {
  startTimer();
  const typedText = inputEl.value.trim();
  const isCorrect = currentQuote.startsWith(typedText);

  if (typedText === currentQuote) {
    const wordCount = currentQuote.split(" ").length;
    totalTypedWords += wordCount;
    score++;
    scoreEl.textContent = score;
    inputEl.classList.remove("incorrect");
    inputEl.classList.add("correct");
    loadQuote();
  } else {
    inputEl.classList.remove("correct");
    inputEl.classList.add(isCorrect ? "correct" : "incorrect");
  }
});

// Calculate WPM
function updateWPM() {
  const minutesPassed = (60 - timeLeft) / 60;
  const wpm = minutesPassed > 0 ? Math.round(totalTypedWords / minutesPassed) : 0;
  wpmEl.textContent = wpm;
}

// Reset game
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  score = 0;
  timeLeft = 60;
  totalTypedWords = 0;
  isGameRunning = false;

  inputEl.disabled = false;
  inputEl.value = "";
  timeEl.textContent = timeLeft;
  scoreEl.textContent = score;
  wpmEl.textContent = 0;
  inputEl.classList.remove("correct", "incorrect");

  loadQuote();
});

loadQuote();
