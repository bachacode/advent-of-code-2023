const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "example.txt");
const file = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
const lines = file.split("\n").map((line) => line.trim());

const games = {
    time: lines[0].split("Time:")[1].trimStart().split(/\s+/),
    distance: lines[1].split("Distance:")[1].trimStart().split(/\s+/),
};

const winnableGames = [];

for (let index = 0; index < games.distance.length; index++) {
    const time = games.time[index];
    const distance = games.distance[index];
    let speed = 0;
    let counter = 0;

    for (let acc = 1; acc < time; acc++) {
        let max = (speed + acc) * (time - acc);

        if (max > distance) {
            counter++;
        }
    }

    // push winnable games in array
    winnableGames.push(counter);
}

const multiplication = winnableGames.reduce((a, b) => a * b, 1);

console.log(multiplication);
