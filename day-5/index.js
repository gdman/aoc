const fs = require('fs');

const isInt = char => /[0-9]/.test(char);

const input  = fs.readFileSync(__dirname + '/almanac.txt', 'utf8');

const lines = input.split('\n');

const seeds = lines.shift().match(/seeds\: (?<seeds>.*)/).groups.seeds.split(' ').map(seed => parseInt(seed));

const maps = [];

let map = {};

while (lines.length > 0) {
    const line = lines.shift();
    
    if (line.length <= 1) {
        map = {};
        maps.push(map);
        continue;
    }

    if (isInt(line[0])) {
        const { groups: { destinationStart, sourceStart, range } } = line.match(/(?<destinationStart>[0-9]+)\s+(?<sourceStart>[0-9]+)\s+(?<range>[0-9]+)/);
        map.mappings.push({
            destinationStart : parseInt(destinationStart),
            sourceStart : parseInt(sourceStart),
            range : parseInt(range)
        });
    } else {
        const { groups: { from, to } } = line.match(/(?<from>[a-zA-Z]+)-to-(?<to>[a-zA-Z]+) map/);
        map.from = from;
        map.to = to;
        map.mappings = [];
    }
}

const getNext = (type, source) => {
    const map = maps.find(map => map.from == type);

    if (!map) {
        return source;
    }

    let destination = source;

    for (const mapping of map.mappings) {
        if (source >= mapping.sourceStart && source <= (mapping.sourceStart + mapping.range)) {
            destination = (source - mapping.sourceStart) + mapping.destinationStart;
            break;
        }
    }

    return getNext(map.to, destination);
}

let minimum = Infinity;

for (const seed of seeds) {
    const destination = getNext('seed', seed);

    minimum = Math.min(minimum, destination);
}

console.log(minimum);