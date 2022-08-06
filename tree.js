const mergeSort = require('./mergeSort');  // Using the mergeSort function I made in previous exercises!

function Tree() {
    // Getters

    // Factories

    // Functionality
    function prepareArray(array) {
        // Sort array
        const sorted = mergeSort(array);
        // Remove duplicates
        const noDuplicates = [];
        for (let i = 0; i < sorted.length; i++) { 
            if (sorted[i] !== sorted[i+1]) {
                noDuplicates.push(sorted[i]);
            }
        }
        // Return new array
        return noDuplicates;
    }

    function buildTree(array) {
        // Throw error if argument is not an array
        // Prepare the array
        // Build the tree! 
    }

    return {
        prepareArray,
        buildTree,
    }
}

module.exports = Tree;