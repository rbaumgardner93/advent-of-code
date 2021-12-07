const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const crabs = fileContents.split("\n")[0]
  .split(',')
  .map(n => +n);

function getMedian(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2;
}

function getAvg( array ) {
  return array.reduce(( curr, acc) => {
    return acc + curr
  }, 0) / array.length;
}

function compare(val, compareVal) {
  return val >= compareVal ? val - compareVal : compareVal - val;
}

function calculateFuel(num) {
  return (num * num + num) / 2;
}

function getFuelCost(target) {
  return crabs.reduce((acc, curr) => {
    return acc + calculateFuel(Math.abs(curr - target));
  }, 0);
}

function partOne(median) {
  let fuel = 0;

  for (let i = 0; i < crabs.length; i++) {
    let crab = crabs[i];
    fuel = fuel + compare(crab, median);
  }

  return fuel;
}

function partTwo(avg) {
  return Math.min(getFuelCost(Math.ceil(avg)), getFuelCost(Math.floor(avg)));
}

console.log(`The treachery of Whales Part 1: ${partOne(getMedian(crabs))}`);
console.log(`The treachery of Whales Part 2: ${partTwo(getAvg(crabs))}`);

