document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const toggleOpponentButton = document.getElementById("toggleOpponent");
  
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let againstAI = true; // Default: Play against AI
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const checkWinner = () => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };
  
    const checkDraw = () => {
      return board.every(cell => cell !== "");
    };
  
    const updateStatus = (winner) => {
      if (winner) {
        status.textContent = `${winner} wins!`;
      } else if (checkDraw()) {
        status.textContent = "It's a draw!";
      } else {
        status.textContent = `Current player: ${currentPlayer}`;
      }
    };
  
    const handleCellClick = (index) => {
      if (board[index] === "" && !checkWinner()) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        
        const winner = checkWinner();
        if (winner) {
          updateStatus(winner);
        } else if (checkDraw()) {
          updateStatus();
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          updateStatus();
          if (againstAI && currentPlayer === "O") {
            // AI's turn
            aiMove();
          }
        }
      }
    };
  
    const aiMove = () => {
      // Simple AI: Randomly choose an empty cell
      let index;
      do {
        index = Math.floor(Math.random() * 9);
      } while (board[index] !== "");
      
      setTimeout(() => {
        handleCellClick(index);
      }, 500); // Delay for better UX
    };
  
    const toggleOpponent = () => {
      againstAI = !againstAI;
      resetGame();
      if (!againstAI && currentPlayer === "O") {
        // If switching to play against human and it's AI's turn, reset current player
        currentPlayer = "X";
        updateStatus();
      }
    };
  
    const resetGame = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      cells.forEach(cell => {
        cell.textContent = "";
      });
      currentPlayer = "X";
      updateStatus();
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(index));
    });
  
    resetButton.addEventListener("click", resetGame);
    toggleOpponentButton.addEventListener("click", toggleOpponent);
  
    updateStatus();
  });
  