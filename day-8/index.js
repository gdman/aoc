const INSTRUCTION_INDEX = { 'L': 0, 'R': 1 };

const fs = require('fs');

const input = fs.readFileSync(__dirname + '/map.txt', 'utf8');

const lines = input.replace(/\r/g, '').split('\n');

const instructions = lines.shift().split('');

lines.shift();

const map = lines.reduce((map, line) => {
    const [ key, to ] = line.split('=').map(part => part.trim());
    map[key] = to.split(',').map(part => part.trim().replace('(', '').replace(')', ''));
    return map;
}, {});

let steps = 0;
let next = 'AAA';
let remainingInstructions = [ ...instructions ];

while (next !== 'ZZZ') {
    if (remainingInstructions.length === 0) {
        remainingInstructions = [ ...instructions ];
    }
    const instruction = remainingInstructions.shift();
    next = map[next][INSTRUCTION_INDEX[instruction]];
    steps++;
}

console.log(steps);