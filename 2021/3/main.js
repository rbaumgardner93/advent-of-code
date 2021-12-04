const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContent = getFileContents(filePath);
const data = fileContent.split('\n').filter( l => l );

function getPowerConsumption( lines ) {
	let zeroCount = 0;
	let gamma = '';
	let epsilon = '';

	for(let i = 0; i < lines[0].length; i++) {
		zeroCount = 0;

		for(let j = 0; j < lines.length; j++) {
			if (lines[j][i] == "0")  {
				zeroCount++;
			}
		}

		if (zeroCount > lines.length / 2) {
			gamma += '0';
			epsilon += '1';
		} else {
			gamma += '1';
			epsilon += '0';
		}
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

// Part 2 with help from https://www.youtube.com/watch?v=z7hb5zXQQ3w
function getCounts(lines) {
	const length = data[0].length;
	const zeros = Array(length).fill(0);
	const ones = Array(length).fill(0);

	for (const line of lines) {
		const bits = [...line];

		bits.forEach((bit, index) => {
			if (bit === "0") {
				zeros[index]++;
			  } else {
			ones[index]++;
		  }
		});
	}

	return { zeros, ones };
}

function getOxygenSensorRating(lines, index = 0) {
  const { zeros, ones } = getCounts(lines);

  let mostCommonBit = "1";
  if (zeros[index] > ones[index]) {
    mostCommonBit = "0";
  }

  const filtered = lines.filter((line) => line[index] === mostCommonBit);
  if (filtered.length === 1) {
    return filtered[0];
  }

  return getOxygenSensorRating(filtered, index + 1);
}

function getCO2Rating(lines, index = 0) {
  const { zeros, ones } = getCounts(lines);

  let leastCommonBit = "0";
  if (zeros[index] > ones[index]) {
    leastCommonBit = "1";
  }

  const filtered = lines.filter((line) => line[index] === leastCommonBit);
  if (filtered.length === 1) {
    return filtered[0];
  }

  return getCO2Rating(filtered, index + 1);
}

function lifeSupportRating( oxygenRating, cO2Rating) {
	return parseInt(oxygenRating, 2) * parseInt(cO2Rating, 2);
}


console.log(`Binary Diagnostics Part 1: ${ getPowerConsumption( data ) }`)
console.log(`Binary Diagnostics Part 2: ${ lifeSupportRating( getOxygenSensorRating(data), getCO2Rating(data) ) }`);
