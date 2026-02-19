const CHOICES = ["rock", "paper", "scissors"];
const WINNING_SCORE = 5;

let humanScore = 0;
let computerScore = 0;
let gameOver = false;

const humanScoreEl = document.querySelector("#human-score");
const computerScoreEl = document.querySelector("#computer-score");
const roundResultEl = document.querySelector("#round-result");
const gameResultEl = document.querySelector("#game-result");
const choiceButtons = document.querySelectorAll(".choices button");
const resetButton = document.querySelector("#reset");

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return `It's a tie! You both chose ${humanChoice}.`;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore += 1;
    return `You win this round! ${capitalize(humanChoice)} beats ${computerChoice}.`;
  }

  computerScore += 1;
  return `You lose this round! ${capitalize(computerChoice)} beats ${humanChoice}.`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateScoreboard() {
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
}

function checkForWinner() {
  if (humanScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
    return;
  }

  gameOver = true;

  if (humanScore === WINNING_SCORE) {
    gameResultEl.textContent = "🎉 You won the game!";
  } else {
    gameResultEl.textContent = "🤖 The computer won the game!";
  }

  choiceButtons.forEach((button) => {
    button.disabled = true;
  });
}

function handleChoiceClick(event) {
  if (gameOver) {
    return;
  }

  const humanChoice = event.currentTarget.dataset.choice;
  const computerChoice = getComputerChoice();

  const resultMessage = playRound(humanChoice, computerChoice);
  roundResultEl.textContent = resultMessage;

  updateScoreboard();
  checkForWinner();
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;

  updateScoreboard();
  roundResultEl.textContent = "Make a choice to start the game.";
  gameResultEl.textContent = "";

  choiceButtons.forEach((button) => {
    button.disabled = false;
  });
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", handleChoiceClick);
});

resetButton.addEventListener("click", resetGame);
