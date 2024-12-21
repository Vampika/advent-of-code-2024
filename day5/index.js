import fs from 'fs';


const data = fs.readFileSync("data.txt").toString();

const [rules, pages] = getInputData(data);
const [correctsSumm, wrongs] = checkPages(rules, pages);
console.log(correctsSumm);
console.log(fixWrongs(wrongs, rules));

function fixWrongs(wrongs, rules) {
	let rulesArrays = {};
	let fixed = [];
	let middles = [];

	rules.forEach(rule => {
		if (rulesArrays[rule[0]])
			rulesArrays[rule[0]].push(rule[1])
		else {
			rulesArrays[rule[0]] = [];
			rulesArrays[rule[0]].push(rule[1]);
		}
	});

	wrongs.forEach(row => {
		console.log(row);
		fixed.push(row.sort((a, b) => {
			console.log(a, b);
			if (rulesArrays[a] !== undefined && rulesArrays[a].includes(b))
				return -1
			if (rulesArrays[b] !== undefined && rulesArrays[b].includes(a))
				return 1
			return 0
		}));
	});

	fixed.forEach(page => {
		middles.push(page[Math.ceil(page.length / 2) - 1]);
	})

	let correctsSumm = (middles.reduce((accumulator, number) => Number(accumulator) + Number(number)));
	return correctsSumm;
}

function checkPages(rules, pages) {
	let middles = [];
	let wrongs = [];

	pages.forEach(page => {
		let indexes = {};
		let isOkFlag = true;

		page.forEach((item, index) => indexes[item] = index);

		rules.forEach(rule => {
			if (indexes[rule[0]] !== undefined && indexes[rule[1]] !== undefined) {
				if (indexes[rule[0]] > indexes[rule[1]])
					isOkFlag = false;
			}

		});
		if (isOkFlag)
			middles.push(page[Math.ceil(page.length / 2) - 1]);
		else
			wrongs.push(page);
	});

	let correctsSumm = (middles.reduce((accumulator, number) => Number(accumulator) + Number(number)));
	return [correctsSumm, wrongs];
}

function getInputData(data) {
	let rules = [];
	let pages = [];

	let newData = data.split("\r\n\r\n");
	let part1 = newData[0].split("\r\n");
	let part2 = newData[1];
	part1.forEach(rule => {
		rules.push(rule.split("|"));
	});
	part2 = part2.split("\r\n");
	part2.forEach(row => {
		pages.push(row.split(","));
	})
	return [rules, pages];
}