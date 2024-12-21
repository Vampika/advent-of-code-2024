import fs from 'fs';

const XMAS = "MAS";

const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";
const UPRIGHT = "upright";
const UPLEFT = "upleft";
const DOWNRIGHT = "downright";
const DOWNLFT = "downleft";

const data = fs.readFileSync("data.txt").toString();

const inputArr = getInputArray(data);

const length = inputArr.length;
const width = inputArr[0].length;

let answer = 0;

// for (let i = 0; i < length; i++) {
// 	for (let j = 0; j < width; j++) {
// 		let nextSymbol = inputArr[i][j];
// 		if (nextSymbol == "X") {
// 			console.log("found X: ", i, j);
// 			console.log(checkXMAS(i, j));
// 			answer += checkXMAS(i, j);
// 		}
// 	}
// }

console.log(answer);

let answer2 = 0;

for (let i = 0; i < length; i++) {
	for (let j = 0; j < width; j++) {
		let nextSymbol = inputArr[i][j];
		if (nextSymbol == "M") {
			console.log("found M: ", i, j);
			console.log(checkMAS(i, j));
			answer2 += checkMAS(i, j);
		}
	}
}

console.log(answer2);

function checkMAS(i, j) {
	//console.log("check mas", i, j);
	let count = 0;
	try {
		if (checkDirection(i, j, 1, UPRIGHT)) {
			if (inputArr[i][j + 2] == "M")
				if (checkDirection(i, j + 2, 1, UPLEFT))
					count++
		}
		if (checkDirection(i, j, 1, DOWNRIGHT)) {
			if (inputArr[i + 2][j] == "M") {
				if (checkDirection(i + 2, j, 1, UPRIGHT))
					count++
			}
			if (inputArr[i][j + 2] == "M")
				if (checkDirection(i, j + 2, 1, DOWNLFT))
					count++
		}
		if (checkDirection(i, j, 1, DOWNLFT)) {
			console.log("found downleft");
			if (inputArr[i + 2][j] == "M") {

				if (checkDirection(i + 2, j, 1, UPLEFT))
					count++
			}
		}
	} catch {
		return count;
	}

	return count;
}

function checkXMAS(i, j) {
	let count = 0;
	if (checkDirection(i, j, 1, RIGHT))
		count++;
	if (checkDirection(i, j, 1, LEFT))
		count++;
	if (checkDirection(i, j, 1, UP))
		count++;
	if (checkDirection(i, j, 1, DOWN))
		count++;
	if (checkDirection(i, j, 1, UPRIGHT))
		count++;
	if (checkDirection(i, j, 1, UPLEFT))
		count++;
	if (checkDirection(i, j, 1, DOWNRIGHT))
		count++;
	if (checkDirection(i, j, 1, DOWNLFT))
		count++;
	return count;
}

function checkDirection(i, j, pointer, direction) {
	let length = XMAS.length;

	if (pointer == length)
		return true;
	try {
		if (pointer < length) {
			switch (direction) {
				case RIGHT: {
					let currentValue = inputArr[i][j + 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i, j + 1, pointer + 1, direction);
					}
					break;
				}
				case LEFT: {
					let currentValue = inputArr[i][j - 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i, j - 1, pointer + 1, direction);
					}
					break;
				}
				case UP: {
					let currentValue = inputArr[i - 1][j];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i - 1, j, pointer + 1, direction);
					}
					break;
				}
				case DOWN: {
					let currentValue = inputArr[i + 1][j];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i + 1, j, pointer + 1, direction);
					}
					break;
				}
				case UPRIGHT: {
					let currentValue = inputArr[i - 1][j + 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i - 1, j + 1, pointer + 1, direction);
					}
					break;
				}
				case UPLEFT: {
					let currentValue = inputArr[i - 1][j - 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i - 1, j - 1, pointer + 1, direction);
					}
					break;
				}
				case DOWNRIGHT: {
					let currentValue = inputArr[i + 1][j + 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i + 1, j + 1, pointer + 1, direction);
					}
					break;
				}
				case DOWNLFT: {
					let currentValue = inputArr[i + 1][j - 1];
					if (currentValue == XMAS[pointer]) {
						return checkDirection(i + 1, j - 1, pointer + 1, direction);
					}
					break;
				}
			}
		}
	} catch {
		return false;
	}
}

function getInputArray(data) {
	let inputArr = [[]];
	let i = 0;
	let k = 0;

	while (k < data.length) {
		let nextSymbol = data[k];

		if (nextSymbol.match(/\w/)) {
			inputArr[i].push(nextSymbol);
		}
		else {
			if (nextSymbol.match(/\r/)) {
				i++;
				inputArr.push([]);
			}
		}
		k++;
	}
	return inputArr;
}