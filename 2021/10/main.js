const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
    .split("\n")
    .filter(l => l)
    .map( l => [...l]);

// ): 3 points.
// ]: 57 points.
// }: 1197 points.
// >: 25137 points.

const openings = ['(', '[', '{', '<' ];

const opposing = new Map();
opposing.set(openings[0], ')');
opposing.set(openings[1], ']');
opposing.set(openings[2], '}');
opposing.set(openings[3], '>');

function partOne() {
    const stack = [];
    const found = [];

    const SCORES = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];

            if (openings.includes(char)) {
                stack.push(char);
            } else {
                let last;

                if (stack.length) {
                    last = stack.pop();
                }

                if (opposing.get(last) !== char) {
                    found.push(char);
                }
            }
        }
    }

    return found.reduce((acc, curr) => acc + SCORES[curr], 0);
}

function partTwo() {
    let isCorrupt = false;
    let stack = [];
    const totals = [];

    const SCORES = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    for (let line of lines) {
        for( let char of line) {
            if (openings.includes(char)) {
                stack.push(char);
            } else {
                let last = stack.pop();

                if (opposing.get(last) !== char) {
                    isCorrupt = true;
                    break;
                }
            }
        }

        if (isCorrupt) {
            isCorrupt = false;
            stack = [];
            continue;
        } else {
            const reversed = stack.map(c => {
                return opposing.get(c);
            } ).reverse();
            const sum = reversed.reduce((acc, char) => (acc * 5) + SCORES[char], 0);
            totals.push(sum);
            stack = [];
        }
    }

    return totals[Math.floor(totals.sort((a, b) => a - b).length / 2)];
}

console.log(`Sytanx Scoring Part 1: ${partOne()}`);
console.log(`Sytanx Scoring Part 2: ${partTwo()}`);

