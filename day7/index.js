import fs from 'fs';
const data = fs.readFileSync("data.txt").toString();

const initialData = getData(data);

console.log(doSomething(initialData));

function doSomething(obj) {
	let answer = 0;
	for (let key in obj) {
		let equation = obj[key];
		let answers = calculation(equation.reverse());
		//console.log(answers, key, answers.indexOf(key))
		if (answers.indexOf(Number(key)) !== -1) {
			console.log(key)
			answer += Number(key);
		}
	}
	return answer;
}

function calculation(array) {
	//funal case
	if (array.length === 1)
		return array;

	let current = array[0];

	let nextArr = calculation(array.slice(1, array.length));
	let multiply = nextArr.map(item => item * current);
	let plus = nextArr.map(item => item + current);
	let concat = nextArr.map(item => {
		return Number(String(item) + String(current));
	})
	return multiply.concat(plus, concat);
}

function getData(data) {
	let obj = {}
	data.split("\r\n").map(item => {
		obj[item.split(":")[0]] = item.split(":")[1].trim().split(" ");
	});
	for (let key in obj) {
		obj[key] = obj[key].map(num => Number(num));
	}
	return obj;
}