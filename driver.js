const Tree = require('./tree');

// SPECS for driver
const maxLength = 15;
const minLength = 3;

const minNumber = 0;
const maxNumber = 100;

function getRandomWithinRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Driver() {
    // Determine a random array length
    const arrayLength = getRandomWithinRange(minLength, maxLength);

    // Initialize randomArray
    const randomArray = [];
    // Populate array of the right length
    while (randomArray.length < arrayLength) {
        randomArray.push(getRandomWithinRange(minNumber, maxNumber));
    }

    // Print the array
    console.log(`Random array: ${randomArray}`);

    // build the tree & cache it
    const tree = Tree(randomArray);

    // Confirm that the tree is balanced and print result 
    console.log(`Tree is balanced: ${tree.isBalanced() ? 'yes' : 'no'}`);
}
module.exports = Driver;