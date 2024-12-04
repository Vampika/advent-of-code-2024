import { input } from "./data.js";

//
var time = performance.now();
//

const rows = input.trim().replaceAll("   ", " ").split(/\s/);
const leftList = [];
const rightList = [];
const distances = [];
let summ = 0;

rows.forEach((number, index) => {
	if (index % 2 === 0)
		leftList.push(number);
	else
		rightList.push(number);
}
);

leftList.sort((firstNumber, secondNumber) => firstNumber - secondNumber);
rightList.sort((firstNumber, secondNumber) => firstNumber - secondNumber);

for (let i = 0; i < leftList.length; i++) {
	let currentDistance = Math.abs(leftList[i] - rightList[i]);
	distances.push(currentDistance);
}

summ = distances.reduce((accumulator, curentDistance) => accumulator + curentDistance);
console.log(summ);

//
time = performance.now() - time;
console.log('Время выполнения = ', time, "ms");
//

