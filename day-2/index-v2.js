const fs = require('fs');

const input  = fs.readFileSync(__dirname + '/games.txt', 'utf8');

const total = input.split('\n').reduce((total, str) => {
    const { groups: { game, draws } } = str.match(/Game (?<game>[0-9]+)\: (?<draws>.*)/);

    let minNoOfRed = 0;
    let minNoOfGreen = 0;
    let minNoOfBlue = 0;

    for (const draw of draws.split(';')) {
        const noOfRed   = draw.match(/(?<noOfCubes>[0-9]+) red/  )?.groups?.noOfCubes ?? 0;
        const noOfGreen = draw.match(/(?<noOfCubes>[0-9]+) green/)?.groups?.noOfCubes ?? 0;
        const noOfBlue  = draw.match(/(?<noOfCubes>[0-9]+) blue/ )?.groups?.noOfCubes ?? 0;
        
        minNoOfRed = Math.max(noOfRed, minNoOfRed);
        minNoOfGreen = Math.max(noOfGreen, minNoOfGreen);
        minNoOfBlue = Math.max(noOfBlue, minNoOfBlue);
    }
    
    return total + (minNoOfRed * minNoOfGreen * minNoOfBlue);
}, 0);

console.log(total);