const HUMAN_PLAYER = 'X';
const AI_PLAYER = 'O';
let board = ['', '', '', '', '', '', '', '', ''];
let isAITurn = false;

function evaluate(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === AI_PLAYER && board[b] === AI_PLAYER && board[c] === AI_PLAYER) {
            return 10;
        }
    }
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === HUMAN_PLAYER && board[b] === HUMAN_PLAYER && board[c] === HUMAN_PLAYER) {
            return -10;
        }
    }
    return 0;
}

function gameOver(board) {
    return evaluate(board) !== 0 || board.every(cell => cell !== '');
}

function minimax(board, depth, maximizingPlayer, alpha, beta) {
    if (gameOver(board) || depth === 0) {
        return evaluate(board);
    }
    if (maximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = AI_PLAYER;
                let eval = minimax(board, depth - 1, false, alpha, beta);
                board[i] = '';
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = HUMAN_PLAYER;
                let eval = minimax(board, depth - 1, true, alpha, beta);
                board[i] = '';
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return minEval;
    }
}

function findBestMove(board) {
    let bestEval = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = AI_PLAYER;
            let eval = minimax(board, 5, false, -Infinity, Infinity);
            board[i] = '';
            if (eval > bestEval) {
                bestEval = eval;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function updateCellUI(cellIndex, player) {
    const cell = document.getElementById(`cell${cellIndex}`);
    cell.textContent = player;
}

function handleMove(cellIndex) {
    if (isAITurn || board[cellIndex] !== '' || gameOver(board)) {
        return;
    }
    board[cellIndex] = HUMAN_PLAYER;
    updateCellUI(cellIndex, HUMAN_PLAYER);
    if (gameOver(board)) {
        const result = evaluate(board);
            if (result === 10) {
                alert("AI wins!");
            } else if (result === -10) {
                alert("You win!");
            } else {
                alert("It's a draw!");
            }
        } else {
            isAITurn = false;
        }
    isAITurn = true;
    aiMove(board);
}

function aiMove(board) {
    setTimeout(() => {
        const bestMove = findBestMove(board);
        board[bestMove] = AI_PLAYER;
        updateCellUI(bestMove, AI_PLAYER);
        if (gameOver(board)) {
            const result = evaluate(board);
            if (result === 10) {
                alert("AI wins!");
            } else if (result === -10) {
                alert("You win!");
            } else {
                alert("It's a draw!");
            }
        } else {
            isAITurn = false;
        }
    }, 1000);
}

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});

function cellClickHandler(event) {
    const cellIndex = parseInt(event.target.dataset.index);
    handleMove(cellIndex);
}
