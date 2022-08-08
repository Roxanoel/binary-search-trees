const mergeSort = require('./mergeSort');  // Using the mergeSort function I made in previous exercises!

function Tree(array) {
    let treeRoot = null;
    if(array) treeRoot = buildTree(array);

    // Getters
    function getTreeRoot() {
        return treeRoot;
    }
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
        // Init
        const mid = Math.floor((array.length) / 2);
        // Root: data from middle element, left & right from l&r sub-arrays
        const root = Node(array[mid], 
            buildTreeRecusion(array.slice(0, mid)),
            buildTreeRecusion(array.slice(mid + 1, array.length)));
        // Return root
        treeRoot = root;
        return treeRoot;
    }

    return {
        getTreeRoot,
        prepareArray,
        buildTree,
    }
}

module.exports = Tree;