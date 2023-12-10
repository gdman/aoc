const DIRECTIONS = { 
    '|' : [ -1, 0, 1, 0 ],
    '-' : [ 0, 1, 0, -1 ],
    'L' : [ -1, 1, 0, 0 ],
    'J' : [ -1, 0, 0, -1 ],
    '7' : [ 0, 0, 1, -1 ],
    'F' : [ 0, 1, 1, 0 ]
};

const fs = require('fs');

const input = fs.readFileSync(__dirname + '/map.txt', 'utf8');

const grid = input.replace(/\r/g, '').split('\n').map(row => row.split(''));

const getStartPosition = () => {
    for (let y = 0; y < grid.length; y++) {
        const x = grid[y].indexOf('S');
        
        if (x > -1) {
            return [ x, y ];
        }
    }
};

const getNextCellsFromStart = ([ startX, startY ]) => {
    if (startY > 0) {
        if ([ '|', '7', 'F' ].includes(grid[startY - 1][startX])) {
            return [ [ startX, startY ], ...getNextCells(2, [ startX, startY - 1 ]) ];
        }
    }

    if (startX < grid[startY].length) {
        if ([ '-', '7', 'J'].includes(grid[startY][startX + 1])) {
            return [ [ startX, startY ], ...getNextCells(3, [ startX + 1, startY ]) ];
        }
    }

    if (startY + 1 < grid.length) {
        if ([ '|', 'L', 'J' ].includes(grid[startY + 1][startX])) {
            return [ [ startX, startY ], ...getNextCells(0, [ startX, startY + 1 ]) ];
        }
    }

    if (startX > 0) {
        if ([ '-', 'F', 'L' ].includes(grid[startY][startX - 1])) {
            return [ [ startX, startY ], ...getNextCells(1, [ startX - 1, startY ]) ];
        }
    }

    throw new Error('PANIC - Theres no way out!');
};

const getNextCells = (from, [ currentX, currentY ]) => {
    const cellLetter = grid[currentY][currentX];

    if (cellLetter === 'S') {
        return [];
    }

    const coordinateMods = [ ...DIRECTIONS[cellLetter] ];
    coordinateMods[from] = 0;

    let nextY = currentY + coordinateMods[0] + coordinateMods[2];
    let nextX = currentX + coordinateMods[1] + coordinateMods[3];

    const nextFrom = (coordinateMods.findIndex(val => val != 0) + 2) % 4;

    const nextCells = [ [ currentX, currentY ] ];
    nextCells.push(...getNextCells(nextFrom, [ nextX, nextY ]));
    return nextCells;
}

const startPosition = getStartPosition();
let nextCells = getNextCellsFromStart(startPosition);

console.log(nextCells.length / 2);