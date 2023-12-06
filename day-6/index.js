const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt', 'utf8');

const [ times, distanceRecords ] = input
    .split('\n')
    .map(
        line => line.substring(line.indexOf(':') + 1)
            .split(' ')
            .filter(Boolean)
            .map(number => parseInt(number))
    );

let total = 0;

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distanceRecord = distanceRecords[i];

    let winningSolutions = 0;
    
    for (let ms = 0; ms <= time; ms++) {
        distanceTravelled = (time - ms) * ms;

        if (distanceTravelled > distanceRecord) {
            winningSolutions++;
        }
    }

    total = total > 0 ? total * winningSolutions : winningSolutions;
}

console.log(total);