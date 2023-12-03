const fs = require('fs');

const MAX_RED   = 12;
const MAX_GREEN = 13;
const MAX_BLUE  = 14;

const input  = fs.readFileSync(__dirname + '/games.txt', 'utf8');

const total = input.split('\n').reduce((total, str) => {
    const { groups: { game, draws } } = str.match(/Game (?<game>[0-9]+)\: (?<draws>.*)/);

    for (const draw of draws.split(';')) {
        const noOfRed   = draw.match(/(?<noOfCubes>[0-9]+) red/  )?.groups?.noOfCubes ?? 0;
        const noOfGreen = draw.match(/(?<noOfCubes>[0-9]+) green/)?.groups?.noOfCubes ?? 0;
        const noOfBlue  = draw.match(/(?<noOfCubes>[0-9]+) blue/ )?.groups?.noOfCubes ?? 0;
        
        if (noOfRed > MAX_RED || noOfGreen > MAX_GREEN || noOfBlue > MAX_BLUE) {
            return total;
        }
    }
    
    return total + parseInt(game);
}, 0);

console.log(total);