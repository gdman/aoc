const fs = require('fs');

const input  = fs.readFileSync(__dirname + '/calibration-doc.txt', 'utf8');

const isInt = char => /[0-9]/.test(char);

const total = input.split('\n').reduce((total, str) => {
    let first;
    let last;
    let down = str.length - 1;
    for (let up = 0; up <= str.length - 1; up++) {
        if (!first && isInt(str[up])) {
            first = str[up];
        }
        if (!last) {
            if (isInt(str[down])) {
                last = str[down];
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