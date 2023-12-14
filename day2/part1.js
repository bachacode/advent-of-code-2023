const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'example.txt');
const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14
}

const games = file.split("\n").map(line => line.trim());;

let formattedGames = [];
games.forEach((game) => {
    formattedGames.push({
            id: parseInt(game.match(/\d+/)[0]),
            cubes: game.split(':')[1].split(/[;,]/)
        })
})

let sum = 0;
let isPossible = true;

formattedGames.forEach((game) => {
    
    game.cubes.forEach((cube) => {
        let trimmedCube = cube.trimStart();
        let amount = trimmedCube.split(" ")[0];
        let color = trimmedCube.split(" ")[1];
        if(amount > maxCubes[color]) {
            isPossible = false;
        }
    })

    if(isPossible) {
        sum += game.id;
    }

    isPossible = true;
})

console.log(sum);