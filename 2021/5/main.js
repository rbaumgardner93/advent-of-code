const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const contents = fileContents
	.split("\n")
	.filter(c => c)
	.map( c => {
		return c.replace(/->/g, '').split(' ').filter(c => c);
});

const coordinates = contents.map(c => {
	const [ first, second ] = c;
	const coordOne = first.split('').filter(n => n !== ',').map(n => +n);
	const coordTwo = second.split('').filter(n => n !== ',').map(n => +n);

	return [coordOne, coordTwo];
} );

let diagram = new Array(10).fill('.');
for (let i = 0; i < diagram.length; i++) {
	diagram[i] = new Array(10).fill('.');
}

for (let i = 0; i < coordinates.length; i++) {
	const [x1, y1] = coordinates[i][0];
	const [x2, y2] = coordinates[i][1];

	if (x1 == x2 || y1 == y2) {
		diagram[x1][y1] = 2;
	}
}

diagram.filter( e => e === 2);
