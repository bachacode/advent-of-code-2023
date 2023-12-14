const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'example2.txt');
const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

const numbersRegex = /[0-9]/;

const lines = file.split('\n');

let digits = [];
let sum = 0;

for(const line of lines) {

    let firstDigit = '';
    let lastDigit = '';

    for (const char of line) {
        if(numbersRegex.test(char) && firstDigit == '') {
            firstDigit = char;
            lastDigit = char;
        }

        if(numbersRegex.test(char)) {
            lastDigit = char;
        }
    }
    const fullDigit = firstDigit + lastDigit;

    digits.push(fullDigit);
}

for(const digit of digits) {
    sum += parseInt(digit);
}

console.log(sum);