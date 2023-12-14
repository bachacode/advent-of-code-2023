const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'example.txt');
const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

const lines = file.split('\n').map((line) => line.trim());

let points = 0;

for (let index = 0; index < lines.length; index++) {
    const card = lines[index];
    let startingPoints = 0;

    const winningNumbers = card.split(':')[1].trimStart().split('|')[0].trimEnd().split(' ')
    const playingNumbers = card.split(':')[1].trimStart().split('|')[1].trimStart().split(/\s+/);

    for (let index = 0; index < winningNumbers.length; index++) {
        
        if(playingNumbers.includes(winningNumbers[index])){
            startingPoints += (startingPoints == 0) ? 1 : startingPoints;
            continue;
        }
    }

    points += startingPoints;
}

console.log(points);
