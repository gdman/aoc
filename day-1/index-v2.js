const NUMS = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9' };

const fs = require('fs');

const input  = fs.readFileSync(__dirname + '/calibration-doc.txt', 'utf8');

const isInt = char => /[0-9]/.test(char);
const getNumberForwards = (char, whole) => {
    if (isInt(char)) {
        return char;
    }

    for (const possibleNumber of getPossibleNumbersFromStart(char)) {
        if (whole.substring(0, possibleNumber.length) === possibleNumber) {
            return NUMS[possibleNumber];
        }
    }
    
    return -1;
}
const getNumberBackwards = (char, whole) => {
    if (isInt(char)) {
        return char;
    }

    for (const possibleNumber of getPossibleNumbersFromEnd(char)) {
        if (whole.substring(whole.length - possibleNumber.length) === possibleNumber) {
            return NUMS[possibleNumber];
        }
    }

    return -1;
}

const getPossibleNumbersFromStart = start => Object.keys(NUMS).filter(num => num.startsWith(start));
const getPossibleNumbersFromEnd = end => Object.keys(NUMS).filter(num => num.endsWith(end));

const total = input.split('\n').reduce((total, str) => {
    let first;
    let last;
    let down = str.length - 1;
    for (let up = 0; up <= str.length - 1; up++) {
        if (!first) {
            const number = getNumberForwards(str[up], str.substring(up));
            if (number > 0) {
                first = number;
            }
        }
        if (!last) {
            const number = getNumberBackwards(str[down], str.substring(0, down + 1));
            if (number > 0) {
                last = number;
            } else {
                down--;
            }
        }
        if (first && last) {
            break;
        }
    }

    return total + parseInt((first ?? last) + (last ?? first));
}, 0);

console.log(total);