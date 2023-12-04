const fs = require('fs');

const input  = fs.readFileSync(__dirname + '/cards.txt', 'utf8');

const parseNumbers = numbers => numbers.split(/\s+/).filter(Boolean).map(number => parseInt(number));

const extraCardCopies = {};

const total = input.split('\n').reduce((total, str) => {
    const { groups: { card, data } } = str.match(/Card\s*(?<card>[0-9]+)\: (?<data>.*)/);

    const [ winningNumbersStr, cardNumbersStr ] = data.split('|');

    const winningNumbers = parseNumbers(winningNumbersStr);

    let numberOfWins = 0;
    for (const cardNumber of parseNumbers(cardNumbersStr)) {
        if (winningNumbers.includes(cardNumber)) {
            numberOfWins++;
        }
    }

    const noOfCards = 1 + (extraCardCopies[card] ?? 0)

    for (let i = 0; i < numberOfWins; i++) {
        const extraCardNumber = parseInt(card) + 1 + i;
        if (!extraCardCopies[extraCardNumber]) {
            extraCardCopies[extraCardNumber] = 0;
        }
        extraCardCopies[extraCardNumber] += noOfCards;
    }

    total += noOfCards;
    
    return total;
}, 0);

console.log(total);