const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "puzzle.txt");
const file = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
const lines = file.split("\n").map((line) => line.trim());

const moves = lines[0];

const nodesMap = new Map();

for (let index = 2; index < lines.length; index++) {
    const line = lines[index];
    const regExp = /\(([^)]+)\)/;
    const nodes = line.match(regExp).pop().split(", ");
    const position = {
        currentNode: line.split("=")[0].trimEnd(),
        leftNode: nodes[0],
        rightNode: nodes[1],
    };
    nodesMap.set(position.currentNode, position);
}

function getStartingNodes(map) {
    const startingNodes = [];
    for (const [node, value] of map) {
        const position = value;
        if (position.currentNode[2] == "A") {
            startingNodes.push(position.currentNode);
        }
    }
    return startingNodes;
}

function travelGhostMap(map, moves) {
    const startingNodes = getStartingNodes(map);
    const stepsByNode = [];

    for (let j = 0; j < startingNodes.length; j++) {
        const node = startingNodes[j];
        const position = map.get(node);
        const steps = travelMap(position.currentNode, map, moves);

        stepsByNode.push(steps);
    }

    return stepsByNode;
}

function travelMap(basePosition, map, moves, counter = 0) {
    let currentPosition = map.get(basePosition);
    let steps = counter;
    for (let index = 0; index < moves.length; index++) {
        const move = moves[index];
        let nextNode = "";

        // Assign which is the next node
        if (move == "L") {
            nextNode = currentPosition.leftNode;
        } else if (move == "R") {
            nextNode = currentPosition.rightNode;
        }

        currentPosition = map.get(nextNode);
        steps++;

        if (currentPosition.currentNode.endsWith("Z")) {
            return steps;
        }
    }

    if (currentPosition.currentNode.endsWith("Z")) {
        return steps;
    }

    return travelMap(currentPosition.currentNode, map, moves, steps);
}

const steps = travelGhostMap(nodesMap, moves);

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);
console.log(steps);
console.log(lcmAll(steps));
