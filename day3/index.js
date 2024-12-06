import fs from 'fs';

const inputArr = getInitialArray();

const pairs = getInitialPairs(inputArr);
//console.log(pairs);
let multiplications = getMultiplications(pairs);

const answer = getSummOfMultiplications(multiplications);
//console.log(answer);



//Part 2
const initialArray = getInitialArrayPartTwo();
//initialArray.forEach(item => fs.appendFileSync("first.txt", item + "\n"));

//console.log(initialArray);

let pairsTwo = [];

initialArray.forEach(arr => {
	let inputArr = getInitialArray(arr);
	const pairs = getInitialPairs(inputArr);
	pairs.forEach(pair => pairsTwo.push(pair));
});
//console.log(pairsTwo);

let multiplicationsTwo = getMultiplications(pairsTwo);

const answerTwo = getSummOfMultiplications(multiplicationsTwo);
console.log(answerTwo);

//Utils
function getInitialArray(array) {

	const inputArr = [];
	const regexp = /mul\(\d+,\d+\)/g;
	if (!array) {
		const data = fs.readFileSync("data.txt").toString();

		const reg = Array.from(data.matchAll(regexp));
		reg.forEach(item => inputArr.push(item[0]));
		return inputArr;
	}
	else {
		const reg = Array.from(array.matchAll(regexp));
		reg.forEach(item => inputArr.push(item[0]));
		return inputArr;
	}
}

function getInitialPairs(inputArr) {

	let pairs = [];

	inputArr.forEach(item => {
		const firstReg = /\(\d+,/g;
		const firstStr = Array.from(item.match(firstReg))[0];
		const firstNumber = firstStr.substring(1, firstStr.length - 1);

		const secondReg = /,\d+/g;
		const secondStr = Array.from(item.match(secondReg))[0];

		const secondNumber = secondStr.substring(1);

		const pair = [];
		pair.push(firstNumber);
		pair.push(secondNumber);

		pairs.push(pair);
	});

	return pairs;
}

function getMultiplications(pairs) {

	let multiplications = [];

	pairs.forEach(pair => {
		multiplications.push(pair[0] * pair[1]);
	})

	return multiplications;
}

function getSummOfMultiplications(multiplications) {
	const answer = multiplications.reduce((accumulator, item) => accumulator + item);
	return answer;
}

function getInitialArrayPartTwo() {
	const inputArr = [];
	const data = fs.readFileSync("data.txt").toString();
	const regexp = /do\(\)([\s\S]*?)don't\(\)/g;
	const reg = Array.from(data.matchAll(regexp));
	reg.forEach(item => inputArr.push(item[0]));
	return inputArr;
}