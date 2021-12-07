const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const fishes = fileContents.split("\n")[0]
  .split('')
  .filter(n => n !== ',')
  .map(n => +n);

// fast enough for part 1 not so much part 2...
function walkNumbers(array, days = 0) {
  const TOTAL_DAYS = 80;
  let tempArray = [];
  let arrayOfEights = [];
  for( let i = 0; i < array.length; i++ ) {
    if (array[i] === 0) {
       tempArray.push(array[i] = 6)
       arrayOfEights.push(8);
     } else {
       tempArray.push(array[i] - 1);
     }

    if ( array.length - 1 == i && arrayOfEights ) {
      tempArray.push( ...arrayOfEights );
    }
  }

  days = days + 1;

  if ( days < TOTAL_DAYS ) {
    walkNumbers( tempArray, days );
  } else {
    console.log(`Lantern Fish Part 1: ${tempArray.length}`);
  }
}

// Thanks to thibpat for the more performant solution https://www.youtube.com/watch?v=-ihdC-AKqPM
function countFish() {
  const TOTAL_DAYS = 256;
  const line = Array(9).fill(0);

  for (const fish of fishes) {
    line[fish]++
  }

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const currentFishes = line.shift();
    line.push(currentFishes);
    line[6] += currentFishes;
  }

  return line.reduce((curr, acc) => {
    return curr + acc
  }, 0);

}

walkNumbers(fishes);
console.log(`Lantern Fish Part 2: ${countFish()}`);

