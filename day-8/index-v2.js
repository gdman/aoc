const INSTRUCTION_INDEX = { 'L': 0, 'R': 1 };

const fs = require('fs');

const getLowestCommonMultiple = (a, b) => {
    const high = Math.max(a, b);
    const low = Math.min(a, b);

    let i = high;
    while (i % low !== 0) {
        i += high;
    }
    return i;
}

const getLowestCommonMultipleOfArray = nums => {
    let lowest = nums.shift();
    for (const num of nums) {
        lowest = getLowestCommonMultiple(lowest, num);
    }
    return lowest;
}

const input = fs.readFileSync(__dirname + '/map.txt', 'utf8');

const lines = input.replace(/\r/g, '').split('\n');

const instructions = lines.shift().split('');

lines.shift();

const map = lines.reduce((map, line) => {
    const [ key, to ] = line.split('=').map(part => part.trim());
    map[key] = to.split(',').map(part => part.trim().replace('(', '').replace(')', ''));
    return map;
}, {});

let startKeys = Object.keys(map).filter(key => key.endsWith('A'));
const minSteps = [];

for (const startKey of startKeys) {
    let steps = 0;
    let remainingInstructions = [ ...instructions ];
    let next = startKey;

    while (!next.endsWith('Z')) {
        if (remainingInstructions.length === 0) {
            remainingInstructions = [ ...instructions ];
        }
        const instruction = remainingInstructions.shift();
        next = map[next][INSTRUCTION_INDEX[instruction]];
        steps++;
    }

    minSteps.push(steps);
}

const steps = getLowestCommonMultipleOfArray(minSteps);

console.log(steps);