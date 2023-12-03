const SYMBOLS = [ '*', '#', '+', '$' ];

const fs = require('fs');

const isInt = char => /[0-9]/.test(char);
const isSymbol = char => SYMBOLS.includes(char);

const input  = fs.readFileSync(__dirname + '/engine.txt', 'utf8');

const engine = input.split('\n');

const numberHasAdjacentSymbol = (startY, startX, length) => {
    if (startY > 0) {
        for (let x = Math.max(0, startX - 1); x <= startX + length; x++) {
            if (isSymbol(engine[startY - 1][x])) {
                return true;
            }
        }
    }

    if (startX > 0) {
        if (isSymbol(engine[startY][startX - 1])) {
            return true;
        }
    }

    if (startX + length < engine[startY].length) {
        if (isSymbol(engine[startY][startX + length])) {
            return true;
        }
    }

    if (startY + 1 < engine.length) {
        for (let x = Math.max(0, startX - 1); x <= startX + length; x++) {
            if (isSymbol(engine[startY + 1][x])) {
                return true;
            }
        }
    }

    return false;
}

let total = 0;

for (let y = 0; y < engine.length; y++) {
    let currentNumber = '';
    for (let x = 0; x < engine[y].length; x++) {
        if (isInt(engine[y][x])) {
            currentNumber += engine[y][x];
        } else if (currentNumber) {
            if (numberHasAdjacentSymbol(y, x - currentNumber.length, currentNumber.length)) {
                total += parseInt(currentNumber);
            }

            currentNumber = '';
        }
    }
}

console.log(total);