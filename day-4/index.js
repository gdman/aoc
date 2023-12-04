const fs = require('fs');

const input  = fs.readFileSync(__dirname + '/cards.txt', 'utf8');

const parseNumbers = numbers => numbers.split(/\s+/).filter(Boolean).map(number => parseInt(number));

const total = input.split('\n').reduce((total, str) => {
    const { groups: { data } } = str.match(/Card\s*[0-9]+\: (?<data>.*)/);

    const [ winningNumbersStr, cardNumbersStr ] = data.split('|');

    const winningNumbers = parseNumbers(winningNumbersStr);

    let cardValue = 0;
    for (const cardNumber of parseNumbers(cardNumbersStr)) {
        if (winningNumbers.includes(cardNumber)) {
            cardValue = cardValue > 0 ? cardValue * 2 : 1;
        }
    }

    total += cardValue;
    
    return total;
}, 0);

console.log(total);