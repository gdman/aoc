const CARD_VALUES = { 'A' : 13, 'K' : 12, 'Q' : 11, 'J' : 10, 'T' : 9, '9' : 8, '8' : 7, '7' : 6, '6' : 5, '5' : 4, '4' : 3, '3' : 2, '2' : 1 };

const fs = require('fs');

const input = fs.readFileSync(__dirname + '/hands.txt', 'utf8');

const hands = input.replace(/\r/g, '').split('\n').map(line => line.split(' '));

const getHandRank = hand => {
    const cards = {};

    for (let i = 0; i < hand.length; i++) {
        if (!cards[hand[i]]) {
            cards[hand[i]] = 0;
        }
        cards[hand[i]]++;
    }

    const noOfCardTypes = Object.keys(cards).length;
    const cardCounts = Object.values(cards);

    if (noOfCardTypes === 1) {
        return 7; // FIVE
    }

    if (noOfCardTypes === 2) {
        if (cardCounts.some(count => count === 4)) {
            return 6; // FOUR
        } else {
            return 5; // FULLHOUSE
        }
    }

    if (noOfCardTypes === 3) {
        if (cardCounts.some(count => count === 3)) {
            return 4; // THREE
        } else {
            return 3; // 2PAIR
        }
    }

    if (noOfCardTypes === 4) {
        return 2; // PAIR
    }
    
    return 1; // HIGH
}

const sortedHands = hands.sort((a, b) => {
    const aHandRank = getHandRank(a[0]);
    const bHandRank = getHandRank(b[0]);

    if (aHandRank < bHandRank) {
        return -1;
    }

    if (aHandRank > bHandRank) {
        return 1;
    }

    for (let i = 0; i < 5; i++) {
        const aNextCardValue = CARD_VALUES[a[0][i]];
        const bNextCardValue = CARD_VALUES[b[0][i]];

        if (aNextCardValue < bNextCardValue) {
            return -1;
        }

        if (aNextCardValue > bNextCardValue) {
            return 1;
        }
    }

    return 0;
});

let total = 0;

for (let i = 0; i < sortedHands.length; i++) {
    total += parseInt(sortedHands[i][1]) * (i + 1);
}

console.log(total);