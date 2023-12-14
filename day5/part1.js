const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "example.txt");
const file = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
const lines = file.split("\n").map((line) => line.trim());

const maps = {
    soil: [],
    fertilizer: [],
    water: [],
    light: [],
    temperature: [],
    humidity: [],
    location: [],
};

const keys = Object.keys(maps);

const seeds = lines[0]
    .split(":")[1]
    .trimStart()
    .split(" ")
    .map((seed) => parseInt(seed));

function getMaps(lines, index, key, counter = 1) {
    // If line doesn't not contain numbers, stop
    if (!/[0-9]/.test(lines[index + counter])) {
        return;
    }

    // create object with line
    const soil = {
        destination: parseInt(lines[index + counter].split(" ")[0]),
        source: parseInt(lines[index + counter].split(" ")[1]),
        range: parseInt(lines[index + counter].split(" ")[2]),
    };

    // Push line into array
    maps[key].push(soil);

    // Get new line adding to the counter
    return getMaps(lines, index, key, counter + 1);
}

for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    // Filter soils
    if (line == "seed-to-soil map:") {
        getMaps(lines, index, "soil");
    }

    // Filter fertilizers
    if (line == "soil-to-fertilizer map:") {
        getMaps(lines, index, "fertilizer");
    }

    // Filter water
    if (line == "fertilizer-to-water map:") {
        getMaps(lines, index, "water");
    }

    // Filter light
    if (line == "water-to-light map:") {
        getMaps(lines, index, "light");
    }

    // Filter temperature
    if (line == "light-to-temperature map:") {
        getMaps(lines, index, "temperature");
    }

    // Filter humidity
    if (line == "temperature-to-humidity map:") {
        getMaps(lines, index, "humidity");
    }

    // Filter location
    if (line == "humidity-to-location map:") {
        getMaps(lines, index, "location");
    }
}

function getDestination(values, maps, keys, index = 0) {
    const destinationValues = [];
    const key = keys[index];
    for (const value of values) {
        for (let index = 0; index < maps[key].length; index++) {
            const map = maps[key][index];
            const max = map.source + map.range - 1;
            const difference = value - map.source;

            let destinationValue = value;
            // if source value is not between the range, check next map
            if (value < map.source || value > max) {
                if (index + 1 == maps[key].length) {
                    destinationValues.push(destinationValue);
                }
            } else {
                // if source value is between a valid range get destination value

                destinationValue = map.destination + difference;

                destinationValues.push(destinationValue);
                break;
            }
        }
    }

    if (index + 1 == keys.length) {
        return destinationValues;
    } else {
        return getDestination(destinationValues, maps, keys, index + 1);
    }
}

const locations = getDestination(seeds, maps, keys);

const min = Math.min(...locations);

console.log(min);
