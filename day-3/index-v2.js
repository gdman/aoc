const fs = require('fs');

const isInt = char => /[0-9]/.test(char);
const isSymbol = char => char === '*';

const input  = fs.readFileSync(__dirname + '/engine.txt', 'utf8');

const engine = input.split('\n');

const getGearId = (x, y) => x + ':' + y;

const getAdjacentGear = (startY, startX, length) => {
    if (startY > 0) {
        for (let x = Math.max(0, startX - 1); x <= startX + length; x++) {
            if (isSymbol(engine[startY - 1][x])) {
                return getGearId(startY - 1, x);
            }
        }
    }

    if (startX > 0) {
        if (isSymbol(engine[startY][startX - 1])) {
            return getGearId(startY, startX - 1);
        }
    }

    if (startX + length < engine[startY].length) {
        if (isSymbol(engine[startY][startX + length])) {
            return getGearId(startY, startX + length);
        }
    }

    if (startY + 1 < engine.length) {
        for (let x = Math.max(0, startX - 1); x <= startX + length; x++) {
            if (isSymbol(engine[startY + 1][x])) {
                return getGearId(startY + 1, x);
            }
        }
    }

    return null;
}

const gears = {};

for (let y = 0; y < engine.length; y++) {
    let currentNumber = '';
    for (let x = 0; x <= engine[y].length; x++) {
        if (isInt(engine[y][x])) {
            currentNumber += engine[y][x];
        } else if (currentNumber) {
            const gear = getAdjacentGear(y, x - currentNumber.length, currentNumber.length);

            if (gear) {
                if (!gears[gear]) {
                    gears[gear] = [];
                }
                gears[gear].push(currentNumber);
            }

            currentNumber = '';
        }
    }
}

let total = Object.entries(gears).reduce(
    (total, [ gear, numbers ]) => {
        if (numbers.length === 2) {
            total += numbers[0] * numbers[1];
        }
        return total;
    }, 0);

console.log(total);