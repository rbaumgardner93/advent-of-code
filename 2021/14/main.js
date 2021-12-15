// Thanks thibpat for the help with this solution: https://www.youtube.com/watch?v=7Q7AG33QYoc
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const { getFileContents } = require('../shared');

const fileContents = getFileContents(filePath);

const [ template, data ] = fileContents
    .replace(/\r/g, "")
    .trim()
    .split("\n\n");

const pairRules = data.trim().split("\n").map(x => x.split(" -> "));

function addToMap(map, key, val = 1) {
    if (!map.has(key)) {
        map.set(key, 0);
    }

    map.set(key, map.get(key) + val);
}

const pairRulesMap = new Map();
for (const rule of pairRules) {
    pairRulesMap.set(rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]);
}

let map = new Map();
for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    addToMap(map, pair);
}

function partOne() {
    const lastChar = template[template.length - 1];
    for (let step = 0; step < 10; step++) {
        let currentMap = new Map();
        const keys = map.keys();

        for (const key of keys) {
            const next = pairRulesMap.get(key);
            addToMap(currentMap, next[0], map.get(key));
            addToMap(currentMap, next[1], map.get(key));
        }

        map = currentMap;
    }

    const elementCount = new Map();
    addToMap(elementCount, lastChar);
    const keys = map.keys();
    for (const key of keys) {
        addToMap(elementCount, key[0], map.get(key));
    }

    const values = [...elementCount.values()];
    const min = Math.min(...values);
    const max = Math.max(...values);

    return max - min;
}

function partTwo() {
    const lastChar = template[template.length - 1];
    for (let step = 0; step < 40; step++) {
        let currentMap = new Map();
        const keys = map.keys();

        for (const key of keys) {
            const next = pairRulesMap.get(key);
            addToMap(currentMap, next[0], map.get(key));
            addToMap(currentMap, next[1], map.get(key));
        }

        map = currentMap;
    }

    const elementCount = new Map();
    addToMap(elementCount, lastChar);
    const keys = map.keys();
    for (const key of keys) {
        addToMap(elementCount, key[0], map.get(key));
    }

    const values = [...elementCount.values()];
    const min = Math.min(...values);
    const max = Math.max(...values);

    return max - min;
}

console.log(`Extended Polymerization Part One: ${partOne()}`);
console.log(`Extended Polymerization Part Two: ${partTwo()}`);

