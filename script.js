const sudokuGrid = document.getElementById('sudokuGrid').children;

// Sudoku Solver using Backtracking
function solveSudoku() {
	let board = getGridValues();
	if (solve(board)) {
		setGridValues(board);
	} else {
		alert('No solution exists for the given Sudoku.');
	}
}

function solve(board) {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				for (let num = 1; num <= 9; num++) {
					if (isValid(board, row, col, num)) {
						board[row][col] = num;
						if (solve(board)) {
							return true;
						}
						board[row][col] = 0;
					}
				}
				return false;
			}
		}
	}
	return true;
}

function isValid(board, row, col, num) {
	for (let x = 0; x < 9; x++) {
		if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
			return false;
		}
	}
	return true;
}

// Get values from the grid
function getGridValues() {
	let board = [];
	let row = [];
	for (let i = 0; i < sudokuGrid.length; i++) {
		if (i % 9 === 0 && i !== 0) {
			board.push(row);
			row = [];
		}
		let val = sudokuGrid[i].value ? parseInt(sudokuGrid[i].value) : 0;
		row.push(val);
	}
	board.push(row);
	return board;
}

// Set values to the grid
function setGridValues(board) {
	for (let i = 0; i < sudokuGrid.length; i++) {
		let row = Math.floor(i / 9);
		let col = i % 9;
		sudokuGrid[i].value = board[row][col] !== 0 ? board[row][col] : '';
	}
}

// Clear the grid
function clearGrid() {
	for (let i = 0; i < sudokuGrid.length; i++) {
		sudokuGrid[i].value = '';
	}
}

// Get a new Sudoku puzzle from API
function getSudokuPuzzle() {
	fetch('https://sugoku.onrender.com/board?difficulty=medium')
		.then(response => response.json())
		.then(data => {
			setGridValues(data.board);
		})
		.catch(error => {
			console.error('Error fetching Sudoku puzzle:', error);
		});
}
