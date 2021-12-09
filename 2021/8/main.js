const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
	.split("\n")
	.filter(l => l)
	.map(l => {
		const [ signals, outputs ] = l.split(' | ').map(l => {
			return l.split(" ").map(str => {
				const letters = [...str];
				letters.sort();
				return letters.join('');
			} );
		} );

		return {
			signals,
			outputs
		}
	} );

function filterByLength(arr) {
	return arr.filter(v => [2,3,4,7].includes(v.length));
}

function includes(strOne, strTwo) {
	const set = new Set([...strOne]);
	return [...strTwo].every(val => set.has(val));
}

function createPatternDictionary(signals) {
	const matches = {
		1: signals.find(signal => signal.length === 2),
		4: signals.find(signal => signal.length === 4),
		7: signals.find(signal => signal.length === 3),
		8: signals.find(signal => signal.length === 7),
	};
	matches[6] = signals.find(
		signal => signal.length === 6 && !includes(signal, matches[1])
	);
	matches[9] = signals.find(
		signal => signal.length === 6 && signal !== matches[6] && includes(signal, matches[4])
	);
	matches[0] = signals.find(
		signal => signal.length === 6 && signal !== matches[6] && signal !== matches[9]
	);
	matches[3] = signals.find(
		signal => signal.length === 5 && includes(signal, matches[1])
	);
	matches[5] = signals.find(
		signal => signal.length === 5 && signal !== matches[3] && includes(matches[6], signal)
	);
	matches[2] = signals.find(
		signal => signal.length === 5 && signal !== matches[3] && signal !== matches[5]
	);

	const table = Object.fromEntries(
		Object.entries(matches).map(match => match.reverse())
	);

	return table;
}

function partOne() {
	let count = 0;
	for (const line of lines) {
		const matches = filterByLength(line.outputs);

		count += matches.length;
	}

	return count;
}

function partTwo() {
	let total = 0;
	for(const line of lines) {
		const table = createPatternDictionary(line.signals);

		const found = Number(line.outputs.map(output => table[output]).join(''));

		total += found;
	}

	return total;
}

console.log(`Seven Segment Search Part One: ${partOne()}`);
console.log(`Seven Segment Search Part Two: ${partTwo()}`);


