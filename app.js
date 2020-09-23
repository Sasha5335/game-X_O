const input = document.querySelector('#display')
const cells = document.querySelectorAll('.cell');
const restart = document.getElementById('restart');
let winIndex = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let message = document.getElementById('message');
let player = 'X';
let stepCount = 0;
let stepWin_X = 0;
let stepWin_O = 0;
let draw = 0;
let data = [];
let paused = false;
let win_X = document.getElementById('win_x');
let win_O = document.getElementById('win_0');
let winDraw = document.getElementById('win_draw');


for (let i = 0; i < cells.length; i++) {
	clickCell(cells[i]);
}

restart.addEventListener('click', restartGame);

function clickCell(cell) {

	cell.addEventListener('click', step);

	function step() {
		if (cell.innerHTML == '' && paused == false) {
			cell.innerHTML = player;
			let id = cell.getAttribute('data-id')
			data[id] = player;
			changePlayer();
			message.innerHTML = `Ходит: ${player}`;
			stepCount++;
			console.log(stepCount)

			if (checkWin()) {
				changePlayer();
				message.innerHTML = `Выграл: ${player}`;
				if (player === 'X') {
					stepWin_X++;
				}
				else {
					stepWin_O++;
				}
				paused = true;
				stepCount = 0;
			}

			if (stepCount >= 9) {
				message.innerHTML = 'Ничья';
				draw++;
				console.log(stepCount)
				stepCount = 0;

			}
			outputSteps();
		}
	}
}


function checkWin() {
	for (let i = 0; i < winIndex.length; i++) {
		let id = winIndex[i];
		if (data[id[0]] && data[id[0]] == data[id[1]] && data[id[1]] == data[id[2]]) {
			return true;
		}
	}
	return false;
}

function changePlayer() {
	if (player === 'X') {
		player = 'O';
	}
	else {
		player = 'X';
	}
}

function outputSteps() {
	win_X.innerHTML = stepWin_X;
	win_O.innerHTML = stepWin_O;
	winDraw.innerHTML = draw;
}

function restartGame() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = '';
	}
	paused = false;
	changePlayer();
	data = [];
	player = 'X';
}