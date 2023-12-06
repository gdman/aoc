const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const [ time, distanceRecord ] = input
    .split('\n')
    .map(
        line => parseInt(line.substring(line.indexOf(':') + 1).replace(/\s*/g, ''))
    );

let total = 0;

for (let ms = 0; ms <= time; ms++) {
    distanceTravelled = (time - ms) * ms;

    if (distanceTravelled > distanceRecord) {
        total++;
    }
}

console.log(total);