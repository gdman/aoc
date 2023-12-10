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
    const sequenceClone = [ ...sequence ];
    const nextSequence = [];
    let last = sequenceClone.shift();
    for (const number of sequenceClone) {
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

    let subtraction = 0;
    for (let i = childSequences.length - 1; i >= 0; i--) {
        const childSequence = childSequences[i];
        childSequence.unshift(childSequence[0] - subtraction);
        subtraction = childSequence[0];
    }

    total += sequence[0];
}

console.log(total);