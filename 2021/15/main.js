const path = require('path');
const filePath = path.join(__dirname, 'test-input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
	.trim()
	.split("\n")
	.filter(l => l)
	.map(l => l.split('').map(n => +n));

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i]; j++ ) {
		if (lines[i] == undefined) {
			return;
		}

		if (lines[i][j] == undefined) {
			return;
		}

		const current = lines[i][j];
		const next = lines[i][j + 1];
		const below = lines[i + 1][j];

		if (
	}
}
