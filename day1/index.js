import { input } from "./data.js";

//
var time = performance.now();
//
const [leftList, rightList] = createLists(input);

const distancesSumm = getDistancesSumm(leftList, rightList); //Distances summ for first task

const summSimilarityScores = similarityScores(leftList, rightList); // Similarity scores for second task


console.log(summSimilarityScores);

//
time = performance.now() - time;
console.log('Время выполнения = ', time, "ms");
//

function createLists(data) {
	const rows = input.trim().replaceAll("   ", " ").split(/\s/);
	const leftList = [];
	const rightList = [];

	rows.forEach((number, index) => {
		if (index % 2 === 0)
			leftList.push(number);
		else
			rightList.push(number);
	}
	);

	leftList.sort((firstNumber, secondNumber) => firstNumber - secondNumber);
	rightList.sort((firstNumber, secondNumber) => firstNumber - secondNumber);


	return [leftList, rightList]
}

function getDistancesSumm(leftList, rightList) {
	let distances = [];
	for (let i = 0; i < leftList.length; i++) {
		let currentDistance = Math.abs(leftList[i] - rightList[i]);
		distances.push(currentDistance);
	}

	const summ = distances.reduce((accumulator, curentDistance) => accumulator + curentDistance);
	return summ;
}

function similarityScores(leftList, rightList) {
	let appearsInThRightList = {};
	let summSimilarityScores = 0;

	rightList.forEach(number => {
		if (!appearsInThRightList[number])
			appearsInThRightList[number] = 1;
		else
			appearsInThRightList[number]++;
	});

	leftList.forEach((currentNumber) => {
		let numberAppears = appearsInThRightList[currentNumber];
		if (numberAppears)
			summSimilarityScores += currentNumber * numberAppears;
	});

	return summSimilarityScores;
}