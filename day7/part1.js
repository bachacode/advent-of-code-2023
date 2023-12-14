const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "puzzle.txt");
const file = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
const lines = file.split("\n").map((line) => line.trim());

const hands = [];

const cardsLiteral = "23456789TJQKA";

for (let index = 0; index < lines.length; index++) {
    const line = lines[index].split(" ");
    const hand = {
        cards: line[0],
        bid: line[1],
    };

    hands.push(hand);
}

function getHandType(hand) {
    const duplicates = {};
    let handType = 0;

    for (let index = 0; index < hand.cards.length; index++) {
        const card = hand.cards[index];

        // Check if card already exist
        if (duplicates[card]) {
            // count + 1 to the duplicate of that card
            duplicates[card]++;
            handType += duplicates[card];
        }
        // If card doesn't exist, set it as 1
        else {
            duplicates[card] = 1;
            handType += duplicates[card];
        }
    }

    return handType;
}

hands.sort((a, b) => {
    // If hand A has more duplicates than hand B, is a better hand
    if (getHandType(a) > getHandType(b)) {
        return 1;
    }
    // Otherwise hand B is the better hand
    else if (getHandType(a) < getHandType(b)) {
        return -1;
    }

    for (let index = 0; index < a.cards.length; index++) {
        const cardOne = a.cards[index];
        const cardTwo = b.cards[index];

        if (cardOne == cardTwo) {
            continue;
        }

        if (
            cardsLiteral.split("").findIndex((card) => card == cardOne) >
            cardsLiteral.split("").findIndex((card) => card == cardTwo)
        ) {
            return 1;
        } else {
            return -1;
        }
    }
});

const sum = hands.reduce((a, b, i) => {
    return a + b.bid * (i + 1);
}, 0);

console.log(sum);
