// Elements
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("reset");
const turnText = document.getElementById("turnText");

const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

const nameX = document.getElementById("nameX");
const nameO = document.getElementById("nameO");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

// Sounds
const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");

// Game state
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];   
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

// Winning combinations
const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Update player names
function updateNames() {
    nameX.textContent = playerXInput.value || "Player X";
    nameO.textContent = playerOInput.value || "Player O";
}
playerXInput.addEventListener("input", updateNames);
playerOInput.addEventListener("input", updateNames);

// Handle cell click
function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    clickSound.currentTime = 0;
    clickSound.play();

    checkResult();
}

// Check win or tie
function checkResult() {
    let winningCombo = null;

    for (let combo of winConditions) {
        const [a, b, c] = combo;
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningCombo = combo;
            break;
        }
    }

    // WIN
    if (winningCombo) {
        winningCombo.forEach(i => cells[i].classList.add("win"));

        const winnerName =
            currentPlayer === "X" ? nameX.textContent : nameO.textContent;

        turnText.textContent = `🏆 ${winnerName} Wins!`;

        winSound.play();

        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        gameActive = false;
        return;
    }

    // TIE
    if (!board.includes("")) {
        turnText.textContent = "🤝 It's a Tie!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const nextPlayer =
        currentPlayer === "X" ? nameX.textContent : nameO.textContent;
    turnText.textContent = `${nextPlayer}'s Turn`;
}

// Reset game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    turnText.textContent = `${nameX.textContent}'s Turn`;
}

// Events
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
