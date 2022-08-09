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

    // Level order
    const levelOrder = [];
    tree.levelOrder(tree.getTreeRoot(), (node) => levelOrder.push(node.data));
    console.log(`Level order traversal: ${levelOrder}`);

    // Preorder traversal
    console.log(`Preorder traversal: ${tree.preorder(tree.getTreeRoot())}`);

    // Inorder traversal
    console.log(`Inorder traversal: ${tree.inorder(tree.getTreeRoot())}`);

    // Postorder traversal
    console.log(`Postorder traversal: ${tree.postorder(tree.getTreeRoot())}`);
}
module.exports = Driver;