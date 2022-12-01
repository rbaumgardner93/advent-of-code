const path = require('path');
const filePath = path.join(__dirname, 'test-input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
    .split("\n")
    .filter(l => l);

const coordinates = lines.filter(n => !n.includes('='));
const folds = lines.filter(n => n.includes('=')).map(f => f.split(' ')[2].split('=')).map(c => {
	return {
		c[0]: +c[1]
	}
});

console.log(folds);
