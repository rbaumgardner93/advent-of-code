const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
    .split("\n")
    .filter(l => l)
    .map( l => [...l].map(n => +n));



let flashes = 0;
let stepCount = 0;
let firstSynchronizedFlash;

function flash({i, j, exploded}) {
	if (lines[i] == undefined) return;
	if (lines[i][j] == undefined) return;

	let key = `${i}:${j}`;
	if (exploded.has(key)) {
		return;
	}

	lines[i][j]++;
	if (lines[i][j] > 9) {
		exploded.add(key);
		lines[i][j] = 0;
		flashes++;

		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				if ( x === 0 && y === 0) {
					continue;
				}

				flash( { i: i + x, j: j + y, exploded } );
			}
		}
		return;
	}
}

function step() {
	stepCount++;
	let exploded = new Set();

	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			flash({i, j, exploded});
		}
	}

	if (firstSynchronizedFlash == undefined &&
		exploded.size == lines.length * lines[0].length) {
		firstSynchronizedFlash = stepCount;
	}
}

function partOne() {
	let count = 0;

	do {
		step();
		count++;
	} while( count < 100);

	return flashes;
};

function partTwo() {
	do {
		step();
	} while (firstSynchronizedFlash == undefined);

	return firstSynchronizedFlash;
}

console.log(`Dumbo Octopus Part 1: ${partOne()}`);
console.log(`Dumbo Octopus Part 2: ${partTwo()}`);
