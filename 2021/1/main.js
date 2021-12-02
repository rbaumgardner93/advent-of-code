const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const data = getFileContents(filePath)
	.split("\n")
	.map( m => +m );

function getMeasurementIncreases( measurements ) {
	let count = 0;

	for( i = 0; i < measurements.length; i++ ) {
		let prev = measurements[i - 1];
		let curr = measurements[i];

		if ( curr > prev ) {
			count++;
		}
	}

	return count;
}

function getSlidingWindowIncreases( measurements ) {
	let count = 0;

	let prev = measurements[0];
	for(i = 3; i < measurements.length; i++) {
		if (prev < measurements[i]) {
			count++;
		}

		prev = measurements[i - 2]
	}

	return count;
}

console.log(`Sonar Sweep Part 1: ${getMeasurementIncreases(data)}`);
console.log(`Sonar Sweep Part 2: ${getSlidingWindowIncreases(data)}`);
