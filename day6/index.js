import fs from 'fs';

const DIRECTIONS = {
	"^": { dx: 0, dy: -1, next: ">" },
	">": { dx: 1, dy: 0, next: "v" },
	"v": { dx: 0, dy: 1, next: "<" },
	"<": { dx: -1, dy: 0, next: "^" }
};

const data = fs.readFileSync("data.txt").toString();

const map = getData(data);
const startCords = getInitialCoords(map);
run(map, startCords);

function run(map, startCoords) {

	let currentCoords = { ...startCoords };
	let currentDirection = map[currentCoords.y][currentCoords.x];
	let positionsMarked = 0;

	while (true) {
		map[currentCoords.y][currentCoords.x] = "X";
		positionsMarked++;

		const { dx, dy } = DIRECTIONS[currentDirection];
		const nextX = currentCoords.x + dx;
		const nextY = currentCoords.y + dy;

		//Check out of map
		if (map[nextY]?.[nextX] === undefined)
			break;

		//Check obstacles in front of
		if (map[nextY][nextX] === "#")
			currentDirection = DIRECTIONS[currentDirection].next;
		else {
			currentCoords = { x: nextX, y: nextY };
		}
	}

	let positions = 0;
	map.forEach(row => {
		positions += row.filter(x => x === "X").length
	});
	console.log(positions);

}


function getInitialCoords(map) {
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (DIRECTIONS[map[y][x]]) {
				return { x, y };
			}
		}
	}
}

function getData(data) {
	return data.split("\r\n").map(row => row.split(""));
}