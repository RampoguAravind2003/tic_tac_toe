let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && !isGameOver()) {
        gameBoard[cellIndex] = currentPlayer;
        updateCellUI(cellIndex, currentPlayer);
        if (isWinner(currentPlayer)) {
            alert(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            alert('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateHoverEffect();
        }
    }
}

function updateCellUI(cellIndex, symbol) {
    const cell = document.getElementById(`cell${cellIndex}`);
    cell.textContent = symbol;
}

function isWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => {
        return combo.every(index => gameBoard[index] === player);
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function isGameOver() {
    return isWinner('X') || isWinner('O') || isBoardFull();
}

