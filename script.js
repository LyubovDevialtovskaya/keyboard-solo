document.addEventListener("DOMContentLoaded", function () {
  const wordElement = document.getElementById("word");
  const correctCountElement = document.querySelector(".correct-count");
  const wrongCountElement = document.querySelector(".wrong-count");
  const mistakesCountElement = document.querySelector(".word-mistakes");
  const timerElement = document.getElementById("timer");

  let currentWord = "";
  let currentLetterIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let mistakesCount = 0;
  let timerInterval;
  let gameOver = false;

  function generateRandomWord() {
      const words = ["apple", "banana", "orange", "grape", "strawberry"];
      return words[Math.floor(Math.random() * words.length)];
  }

  function updateWord() {
      currentWord = generateRandomWord();
      wordElement.innerHTML = currentWord.split("").map(letter => `<span>${letter}</span>`).join("");
      currentLetterIndex = 0;
  }

  function handleKeyPress(event) {
      if (gameOver) return;

      const keyPressed = event.key.toLowerCase();
      const currentLetter = currentWord[currentLetterIndex];

      if (keyPressed === currentLetter) {
          wordElement.children[currentLetterIndex].classList.add("c");
          currentLetterIndex++;
          if (currentLetterIndex === currentWord.length) {
              correctCount++;
              correctCountElement.textContent = correctCount;
              updateWord();
          }
      } else {
          if (!wordElement.children[currentLetterIndex].classList.contains("w")) {
              wordElement.children[currentLetterIndex].classList.add("w");
              mistakesCount++;
              mistakesCountElement.textContent = mistakesCount;

              if (mistakesCount >= 3) {
                  endGame();
                  return;
              }
          }
      }
  }

  function startTimer() {
      let seconds = 0;
      timerInterval = setInterval(() => {
          seconds++;
          const formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5);
          timerElement.textContent = formattedTime;
      }, 1000);
  }

  function endGame() {
      gameOver = true;
      clearInterval(timerInterval);
      document.removeEventListener("keypress", handleKeyPress);
      alert("Game Over! You made too many mistakes.");
  }

  updateWord();
  startTimer();

  document.addEventListener("keypress", handleKeyPress);
});
