const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const content = getFileContents(filePath);
const formattedData = content
	.split('\n')
	.filter(l => l)
	.map( l => {
		let [ direction, value ] = l.split(" ");

		return { direction, move: +value };
});

function getFinalPosition(data) {
	let depth = 0;
	let position = 0;

	data.forEach((item) => {
		if (item.direction == "down") {
			depth = depth + item.move;
		} else if ( item.direction == "up") {
			depth = depth - item.move
		} else {
			position = position + item.move
		}
	});

	return depth * position;
}

function getPositionWithAim(data) {
	let depth = 0;
	let position = 0;
	let aim = 0;

	data.forEach((item) => {
		if (item.direction == "down") {
			aim = aim + item.move;
		} else if ( item.direction == "up") {
			aim = aim - item.move;
		} else {
			position = position + item.move;
			depth = depth + item.move * aim;
		}
	});

	return depth * position;
}



console.log( `Dive Part 1: ${ getFinalPosition(formattedData)}`);
console.log( `Dive Part 2: ${ getPositionWithAim(formattedData)}`);
