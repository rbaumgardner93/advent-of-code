const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const lines = fileContents
	.split("\n")
	.filter(l => l)
	.map( l => [...l]
		.map(n => parseInt(n, 10) )
	);

function partOne() {
  let found = [];

  for (let i = 0; i < lines.length; i++) {
    const firstRow = lines[0];
    const lastRow = lines[lines.length - 1];
    let rowBelow;
    let rowAbove;

    for(let j = 0; j < lines[0].length; j++) {
      let currNumber = lines[i][j];
      let prevNumber = lines[i][j - 1];
      let nextNumber = lines[i][j + 1];
      let belowNumber;
      let aboveNumber;

      // in the firstrst row
      if ( lines[i] === firstRow) {
	rowBelow = lines[i + 1];
	belowNumber = rowBelow[j];
	compare(currNumber, nextNumber, prevNumber, 10, belowNumber)

	// in the middle
      } else if ( lines[i] !== firstRow && lines[i] !== lastRow) {
	rowBelow = lines[i + 1];
	rowAbove = lines[i - 1];
	belowNumber = rowBelow[j];
	aboveNumber = rowAbove[j];
	compare(currNumber, nextNumber, prevNumber, aboveNumber, belowNumber);

	// were in the last row
      } else {
	rowAbove = lines[i - 1];
	aboveNumber = rowAbove[j];
	compare(currNumber, nextNumber, prevNumber, aboveNumber, 10)
      }
    }
  }

  function compare(current, next, prev, above, below) {
    // in the middle of the row
    if (prev !== undefined && next !== undefined) {
      current < prev &&
	current < next &&
	current < above &&
	current < below && found.push(current + 1);

      // were in the first column
    } else if (next !== undefined) {
      current < next && current < above && current < below && found.push(current + 1);
      // were in the last column
    } else {
      current < prev && current < above && current < below && found.push(current + 1);
    }
  };

  let sum = found.reduce((acc, curr) => acc + curr, 0);

  return sum;
}

function partTwo() {
  let basins = [];

  const area = Array(lines.length)
    .fill(0)
    .map((row, rowIndex) =>
      Array(lines[0].length)
	.fill(0)
	.map((column, colIndex) => (lines[rowIndex][colIndex] === 9 ? 9 : 0 ))
    );

  for (let i = 0; i < lines.length; i++) {
    for(let j = 0; j < lines[0].length; j++) {
      const size = startFill(i, j, area);

      if (size > 0) {
	basins.push(size);
      }
    }
  }

  function startFill(i, j, area) {
    if (area[i][j] === 9) {
      return 0;
    }

    area[i][j] = 9;

    let size = 1;

    if (i - 1 >= 0) {
      size += startFill(i - 1, j, area);
    }

    if (i + 1 < area.length) {
      size += startFill(i + 1, j, area);
    }

    if (j - 1 >= 0) {
      size += startFill(i, j - 1, area);
    }

    if (j + 1 < area[i].length) {
      size += startFill(i, j + 1, area);
    }

    return size;
  }

  const sorted = basins.sort((a, b) => b - a);
  const firstThree = sorted.slice(0, 3);

  return firstThree.reduce((acc, curr) => acc * curr, 1);
};

console.log(`Smoke Basins Part 1: ${partOne()}`);
console.log(`Smoke Basins Part 2: ${partTwo()}`);
