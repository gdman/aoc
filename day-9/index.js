const fs = require('fs');

const input = fs.readFileSync(__dirname + '/history.txt', 'utf8');

const sequences = input
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line
        .split(' ')
        .map(num => parseInt(num)
    )
);

const getNextSequence = sequence => {
    const nextSequence = [];
    let last = sequence.shift();
    for (const number of sequence) {
        nextSequence.push(number - last);
        last = number;
    }
    return nextSequence;
}

let total = 0;

for (const sequence of sequences) {
    const childSequences = [ sequence ];
    let lastChildSequence = sequence;
    while (!lastChildSequence.every(number => number === 0)) {
        lastChildSequence = getNextSequence(lastChildSequence);
        childSequences.push(lastChildSequence);
    }

    let addition = 0;
    for (let i = childSequences.length - 1; i >= 0; i--) {
        const childSequence = childSequences[i];
        childSequence.push(childSequence[childSequence.length - 1] + addition);
        addition = childSequence[childSequence.length - 1];
    }

    total += sequence[sequence.length - 1];
}

console.log(total);