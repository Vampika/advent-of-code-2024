import fs from 'fs';

const data = fs.readFileSync("data.txt").toString().trim();

const initialData = getData(data);
//const optimizedData = optimizing(initialData);
const optimizedData = newOptimizing(initialData);
//console.log(optimizedData);
checkSumm(optimizedData);

function checkSumm(data) {
	let pointer = 0;
	let summ = 0;
	while (pointer < data.length) {
		if (data[pointer] === ".") {
			pointer++;
			continue;
		}
		summ += parseInt(data[pointer]) * pointer;
		pointer++;
	}
	console.log(summ);
}

function newOptimizing(data) {
	//console.log(data);

	let distance = 0;
	let number = null;
	let hash = {};

	for (let i = data.length - 1; i >= 0; i--) {
		if (data[i] !== ".") {
			//Нашли число
			if (number === null) {
				//Значит счетчик еще не начался
				number = data[i];
				distance++;
			} else {
				//Значит число уже было
				if (data[i] !== number) {
					//Нашли новое число. Делаем манипуляции по переносу старых данных
					let emptyStart = checkEmptySpace(data, i, distance);
					if (emptyStart !== -1) {
						if (!hash[number]) {
							data = swap(data, distance, emptyStart, i, number);
							hash[number] = true;
							//console.log("Переносим число ", number);
						}
					}
					console.log(data);
					//Перенесли данные
					number = data[i];
					distance = 1;
				} else distance++;
			}
		}
		else {
			//Это точка
			if (number !== null) {
				//Число существует
				let emptyStart = checkEmptySpace(data, i, distance);
				if (emptyStart !== -1) {
					if (!hash[number]) {
						data = swap(data, distance, emptyStart, i, number);
						hash[number] = true;
						//console.log("Переносим число ", number);
					}
				}
				number = null;
				distance = 0;
			}
		}

	}
	return data;
}

function swap(data, distance, emptyStart, i, number) {
	for (let j = 0; j < distance; j++) {
		data[emptyStart + j] = number;
	}
	for (let j = 0; j < distance; j++) {
		data[i + 1 + j] = "."
	}
	return data;
}

function checkEmptySpace(data, rightPointer, distance) {
	//console.log(distance)
	let count = 0;
	let start = -1;

	for (let i = 0; i < rightPointer; i++) {
		if (data[i] === ".") {
			if (start === -1) start = i;
			count++;
			if (count === distance) return start;
		}
		else {
			count = 0;
			start = -1;
		}
	}
	return -1;
}

function optimizing(data) {
	let leftPointer = 0;
	let rightPointer = data.length - 1;

	let dataArr = data;

	while (leftPointer < rightPointer) {
		if (dataArr[leftPointer] !== ".") {
			leftPointer++;
		} else {
			if (dataArr[rightPointer] !== ".") {

				dataArr[leftPointer] = dataArr[rightPointer];
				dataArr[rightPointer] = ".";
				leftPointer++;
			}
			rightPointer--;
		}
	}
	return dataArr;
}


function getData(data) {
	let blocks = [];
	let index = 0;

	for (let i = 0; i < data.length; i += 2) {
		const fileSize = parseInt(data[i]);
		const freeSpace = parseInt(data[i + 1]);

		for (let j = 0; j < fileSize; j++) {
			blocks.push(index);
		}
		if (freeSpace !== NaN) {
			for (let j = 0; j < freeSpace; j++)
				blocks.push(".");
		}
		index++;
	}
	return blocks;
}
