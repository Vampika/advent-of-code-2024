import { input } from "./data.js";
import fs from 'fs';

var time = performance.now();

const rows = input.trim().split(/\n/);
let safeReportsCount = 0;
let unsafeReports = [];
let tolerateReportsCount = 0;
let toleratesReports = [];
let untolerateReports = [];

[safeReportsCount, unsafeReports] = divideSafe(rows);
[tolerateReportsCount, toleratesReports, untolerateReports] = divideTolerate(unsafeReports);

console.log(safeReportsCount, tolerateReportsCount, safeReportsCount + tolerateReportsCount);

time = performance.now() - time;
console.log('Время выполнения = ', time, "ms");

function divideSafe(rows) {
	let safeCount = 0;
	let unsafe = [];
	rows.forEach(row => {
		let report = row.split(/\s/);
		let direction = getDirection(report);
		let safe = true;
		for (let i = 0; i < report.length - 1; i++) {
			let difference = report[i] - report[i + 1];

			if (!inRange(difference))
				safe = false;

			if ((difference > 0 && direction === "increase") || (difference < 0 && direction === "decrease"))
				safe = false;
		}

		if (safe == true)
			safeCount++;
		else
			unsafe.push(row);
	});

	return [safeCount, unsafe];
}

function divideTolerate(rows) {
	let safeCount = 0;
	let toleratesReports = [];
	let untolerateReports = [];


	rows.forEach(row => {
		let report = row.split(/\s/);
		let rowDirection = getDirection(report);
		let safe = false;
		let flowChangesCount = 0;
		let zerosDifferenceCount = 0;
		let bigDistanceCount = 0;
		let directionChangingIndexes = [];
		let bigDistancesIndexes = [];

		for (let i = 0; i < report.length - 1; i++) {
			let difference = report[i] - report[i + 1];
			let direction;

			if (difference === 0) {
				zerosDifferenceCount++;
				continue;
			}
			else {
				direction = difference > 0 ? "decrease" : "increase";
				//Check big distance
				if (!inRange(difference)) {
					bigDistanceCount++;
					bigDistancesIndexes.push(i);
					continue;
				}
			}

			//Check flow change
			if (rowDirection !== direction) {
				//Flow changed
				flowChangesCount++;
				directionChangingIndexes.push(i + 1);
				continue;
			}
		}
		let errorsCount = flowChangesCount + zerosDifferenceCount + bigDistanceCount;
		if (errorsCount == 1)
			safe = true;

		if (flowChangesCount == 2 && zerosDifferenceCount == 0 && bigDistanceCount == 0) {

			if (directionChangingIndexes[1] - directionChangingIndexes[0] === 1)
				safe = true;
		}

		if (flowChangesCount == 1) {
			let direction = report[directionChangingIndexes[0] - 1] - report[directionChangingIndexes[0] + 1] > 0 ? "decrease" : "increase";
			if (direction !== rowDirection)
				safe = false;
		}

		if (bigDistanceCount == 1 && flowChangesCount == 1) {
			if (directionChangingIndexes[0] == bigDistancesIndexes[0]) {

				if (report[directionChangingIndexes[0] - 1] - report[directionChangingIndexes[0] + 1] < 3 && report[directionChangingIndexes[0] - 1] - report[directionChangingIndexes[0] + 1] > 1)
					safe = true;
			}
		}

		if (safe == true) {
			toleratesReports.push(row);
			safeCount++;
		}
		else
			untolerateReports.push(row);
	});

	return [safeCount, toleratesReports, untolerateReports];
}

function getDirection(report) {
	let decrease = 0;
	let increase = 0;

	for (let i = 0; i < report.length - 1; i++) {
		let distance = report[i] - report[i + 2];

		if (distance >= 0)
			decrease++;
		else
			increase++;
	}

	if (decrease >= increase)
		return "decrease";
	else
		return "increase";
}

function inRange(difference) {
	if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
		return false;
	}
	return true;
}
