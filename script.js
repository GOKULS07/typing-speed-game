const quotes = [
  "Typing fast is a superpower in the digital age.",
  "Practice makes perfect, even for typing speed.",
  "JavaScript is fun when you get the hang of it.",
  "Front-end development is all about creativity.",
  "Stay focused and type with precision.",
  "Web developers turn coffee into websites.",
  "Write code. Debug. Repeat.",
  "The best way to learn is by building."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let currentQuote = "";
let score = 0;
let timeLeft = 60;
let totalTypedWords = 0;
let timer;
let isPlaying = false;

function loadNewQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.focus();
}

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      updateWPM();

      if (timeLeft <= 0) {
        clearInterval(timer);
        inputEl.disabled = true;
        quoteEl.textContent = "⏰ Time's up!";
      }
    }, 1000);
  }
}

function updateWPM() {
  const minutes = (60 - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.round(totalTypedWords / minutes) : 0;
  wpmEl.textContent = wpm;
}

inputEl.addEventListener("input", () => {
  startGame();

  const typed = inputEl.value.trim();
  const original = currentQuote;

  if (original.startsWith(typed)) {
    inputEl.classList.add("correct");
    inputEl.classList.remove("incorrect");
  } else {
    inputEl.classList.add("incorrect");
    inputEl.classList.remove("correct");
  }

  if (typed === original) {
    const wordCount = original.split(" ").length;
    score++;
    totalTypedWords += wordCount;
    scoreEl.textContent = score;
    loadNewQuote();
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timeLeft = 60;
  score = 0;
  totalTypedWords = 0;
  isPlaying = false;

  inputEl.disabled = false;
  timeEl.textContent = timeLeft;
  wpmEl.textContent = 0;
  scoreEl.textContent = 0;
  inputEl.classList.remove("correct", "incorrect");
  loadNewQuote();
});

loadNewQuote();
