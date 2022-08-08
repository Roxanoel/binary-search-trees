const mergeSort = require('./mergeSort');  // Using the mergeSort function I made in previous exercises!

function Tree() {
    // Getters

    // Factories
    function Node(data, left = null, right = null) {
        return {
            data, 
            left,
            right,
        }
    }
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
        if (!Array.isArray(array) || array.length <= 0) throw new Error('Please pass in an array');
        // Prepare the array
        const preparedArray = prepareArray(array);
        // Build the tree! 
        return buildTreeRecusion(preparedArray);
    }

    function buildTreeRecusion(array) {
        // Base case 
        if (array.length === 0) return null;
        if (array.length === 1) return Node(array[0], null, null);
        // Init
        const mid = Math.floor((array.length) / 2);
        // Root: data from middle element
        const root = Node(array[mid]);
        // Subarrays
        const leftSubarray = array.slice(0, mid);
        const rightSubarray = array.slice(mid + 1, array.length);
        // Recursion w/ right and left subarrays
        root.left = buildTreeRecusion(leftSubarray);
        root.right = buildTreeRecusion(rightSubarray);
        // Return root
        return root;
    }

    return {
        prepareArray,
        buildTree,
    }
}

module.exports = Tree;