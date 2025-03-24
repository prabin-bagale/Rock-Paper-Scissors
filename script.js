function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
  function hasPlayerWonTheRound(player, computer) {
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }
  
  let playerScore = 0;
  let computerScore = 0;
  let gameMode = 3; // Default to best of 3
  
  function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();
  
    if (hasPlayerWonTheRound(userOption, computerResult)) {
      playerScore++;
      return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
    } else {
      computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
    }
  }
  
  const playerScoreSpanElement = document.getElementById("player-score");
  const computerScoreSpanElement = document.getElementById("computer-score");
  const roundResultsMsg = document.getElementById("results-msg");
  const winnerMsgElement = document.getElementById("winner-msg");
  const optionsContainer = document.querySelector(".options-container");
  const resetGameBtn = document.getElementById("reset-game-btn");
  const computerChoiceElement = document.getElementById("computer-choice");
  const winConditionElement = document.getElementById("win-condition");
  const bestOf3Btn = document.getElementById("best-of-3-btn");
  const bestOf5Btn = document.getElementById("best-of-5-btn");

  function updateGameMode(mode) {
    gameMode = mode;
    winConditionElement.textContent = `The first one to ${mode} points wins.`;
    bestOf3Btn.classList.toggle("active", mode === 3);
    bestOf5Btn.classList.toggle("active", mode === 5);
    resetGame();
  }

  bestOf3Btn.addEventListener("click", () => updateGameMode(3));
  bestOf5Btn.addEventListener("click", () => updateGameMode(5));
  
  function showResults(userOption) {
    // Disable buttons during animation
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

    // Show thinking animation
    computerChoiceElement.textContent = "?";
    computerChoiceElement.classList.add("animate");

    // After a short delay, show the computer's choice
    setTimeout(() => {
      const computerResult = getRandomComputerResult();
      computerChoiceElement.textContent = computerResult;
      computerChoiceElement.classList.remove("animate");

      if (hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        roundResultsMsg.innerText = `Player wins! ${userOption} beats ${computerResult}`;
      } else if (computerResult === userOption) {
        roundResultsMsg.innerText = `It's a tie! Both chose ${userOption}`;
      } else {
        computerScore++;
        roundResultsMsg.innerText = `Computer wins! ${computerResult} beats ${userOption}`;
      }

      computerScoreSpanElement.innerText = computerScore;
      playerScoreSpanElement.innerText = playerScore;

      if (playerScore === gameMode || computerScore === gameMode) {
        winnerMsgElement.innerText = `${
          playerScore === gameMode ? "Player" : "Computer"
        } has won the game!`;
        resetGameBtn.style.display = "block";
        optionsContainer.style.display = "none";
      }

      // Re-enable buttons after animation
      rockBtn.disabled = false;
      paperBtn.disabled = false;
      scissorsBtn.disabled = false;
    }, 1000);
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    resetGameBtn.style.display = "none";
    optionsContainer.style.display = "block";
    winnerMsgElement.innerText = "";
    roundResultsMsg.innerText = "";
  }
  
  resetGameBtn.addEventListener("click", resetGame);

  const rockBtn = document.getElementById("rock-btn");
  const paperBtn = document.getElementById("paper-btn");
  const scissorsBtn = document.getElementById("scissors-btn");

  rockBtn.addEventListener("click", function () {
    showResults("Rock");
  });

  paperBtn.addEventListener("click", function () {
    showResults("Paper");
  });

  scissorsBtn.addEventListener("click", function () {
    showResults("Scissors");
  });

  // Initialize game mode
  updateGameMode(3);