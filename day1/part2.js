const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'example2.txt');
const numbersRegex = /[0-9]/;

const spelledNumbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
}

const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

const lines = file.split('\n');

let digits = [];
let sum = 0;

function getWordAt (str, pos) {
    // check ranges
    if ((pos < 0) || (pos > str.length)) {
        return '';
    }
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;
    
    // Search for the word's beginning and end.
    let left = str.slice(0, pos + 1).search(/\S+$/); // use /\S+\s*$/ to return the preceding word 
    let right = str.slice(pos).search(/\s/);
    
    // The last word in the string is a special case.
    if (right < 0) {
        return str.slice(left);
    }
    
    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
}
console.log(getWordAt(lines[0], 2));
for(const line of lines) {

    let firstDigit = '';
    let lastDigit = '';

    for (let i = 0; i < line.length; i++) {
        if(numbersRegex.test(line[i]) && firstDigit == '') {
            firstDigit = line[i];
            lastDigit = line[i];
        }

        if(numbersRegex.test(line[i])) {
            lastDigit = line[i];
            
        }
       
    }
    const fullDigit = firstDigit + lastDigit;

    digits.push(fullDigit);
}

for(const digit of digits) {
    sum += parseInt(digit);
}

console.log(sum);