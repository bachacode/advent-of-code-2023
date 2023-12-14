const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'example.txt');
const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

const numbersRegex = /[0-9]/;
const numbersAndDotsRegex = /[0-9.]/;
const lines = file.split('\n').map((line) => line.trim());

let validNumbers = [];

function checkIfValidNumber(startIndex, endIndex, line, previousLine, nextLine, number){
    let isValid = false;
    number = parseInt(number);
    // Check Current line
    // Check previous character if not first
    if(startIndex != 0) {
        isValid = !numbersAndDotsRegex.test(line[startIndex - 1]) ||
        (previousLine != null && !numbersAndDotsRegex.test(previousLine[startIndex - 1])) ||
        (nextLine != null && !numbersAndDotsRegex.test(nextLine[startIndex - 1]));

        if(isValid) {
            validNumbers.push(number);
            return;
        }
    }
    // Check next character if not last
    if(endIndex + 1 != line.length) {
        isValid = !numbersAndDotsRegex.test(line[endIndex + 1]) ||
        (previousLine != null && !numbersAndDotsRegex.test(previousLine[endIndex + 1])) ||
        (nextLine != null && !numbersAndDotsRegex.test(nextLine[endIndex + 1]));
        
        if(isValid) {
            validNumbers.push(number);
            return;
        }
    }

    for(let index = startIndex; index <= endIndex; index++) {
        // Check previous line if not null
        if(previousLine != null) {
            isValid = !numbersAndDotsRegex.test(previousLine[index]);
          
            if(isValid) {
                validNumbers.push(number);
                return;
            }
        }
        // Check previous line if not null
        if(nextLine != null) {
            isValid = !numbersAndDotsRegex.test(nextLine[index]);

            if(isValid) {
                validNumbers.push(number);
                return;
            }
        }
    }

}

for (let index = 0; index < lines.length; index++) {
    // lines
    const line = lines[index];
    const previousLine = index != 0 ? lines[index - 1] : null;
    const nextLine = index + 1 <= lines.length ? lines[index + 1] : null;
    // Numbers limits
    let startIndex = -1;
    let endIndex = -1;
    let number = '';

    // Set numbers limits
    for (let index = 0; index < line.length; index++) {
        const char = line[index];

        if(!numbersRegex.test(char)) {
            continue;
        }

        if(startIndex == -1) {
            startIndex = index;
            number += char;
        }

        if(index != startIndex){
            number += char;
        }

        if(!numbersRegex.test(line[index + 1])) {
            endIndex = index;
            checkIfValidNumber(startIndex, endIndex, line, previousLine, nextLine, number);

            // Reset values
            startIndex = -1;
            endIndex = -1;
            number = '';
        }
    }
}

let sum = 0;
validNumbers.forEach((number) => {
    sum += number;
})

console.log(sum);