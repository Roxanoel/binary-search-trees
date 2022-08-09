const Tree = require('./tree');

let tree;
let testArray = [];

function addToTestArray(item) {
    testArray.push(item.data);
}

beforeEach(() => {
    // Generate default tree
    tree = Tree([1, 7, 4, 23, 8, 9, 4]);
    // Reset the test array
    testArray = [];
});

describe('Building a tree', () => {
    test('prepareArray sorts provided array', () => {
        expect(tree.prepareArray([1, 7, 4, 23, 8, 9])).toStrictEqual([1, 4, 7, 8, 9, 23]);
    });

    test('prepareArray removes duplicates from provided array', () => {
        expect(tree.prepareArray([1, 7, 4, 23, 8, 9, 4])).toStrictEqual([1, 4, 7, 8, 9, 23]);
    });

    test('prepareArray removes tripled values from provided array', () => {
        expect(tree.prepareArray([1, 7, 4, 4, 23, 8, 9, 4])).toStrictEqual([1, 4, 7, 8, 9, 23]);
    });

    test('buildTree throws error if what is passed in is not an array', () => {
        expect(() => { tree.buildTree(1)}).toThrow('Please pass in an array');
    });
    
    test('buildTree returns level-0 root node', () => {
        expect(tree.buildTree([1, 4, 7]).data).toBe(4);
        expect(tree.buildTree([1, 7, 4, 23, 8, 9, 4]).data).toBe(8);
    });

    test('Root node returned by buildTree has correct left child node', () => {
        expect(tree.buildTree([1, 7, 4, 23, 8, 9, 4]).left.data).toBe(4);
    });

    test('Root node returned by buildTree has correct right child node', () => {
        expect(tree.buildTree([1, 7, 4, 23, 8, 9, 4]).right.data).toBe(23);
    });
});

describe('Finding a node', () => {
    test('find returns null if no search value was provided', () => {
        expect(tree.find()).toBe(null);
    });
    test('find returns null if the value is not found in the tree', () => {
        expect(tree.find(50)).toBe(null);
    });
    test('find returns the right node', () => {
        expect(tree.find(4).data).toBe(4);
    });
});

describe('Inorder, preorder, and postoder traversal', () => {
    test('inorder() returns correct traversal of tree', () => {
        expect(tree.inorder(tree.getTreeRoot())).toStrictEqual([1, 4, 7, 8, 9, 23]);
    });
    test('preorder() works', () => {
        expect(tree.preorder(tree.getTreeRoot())).toStrictEqual([8, 4, 1, 7, 23, 9]);
    });
    test('postorder() works', () => {
        expect(tree.postorder(tree.getTreeRoot())).toStrictEqual([1, 7, 4, 9, 23, 8]);
    });
});

describe('levelOrder traversal', () => {
    
    test('levelOrder throws an error if no callback is passed', () => {
        expect(() => {tree.levelOrder(tree.getTreeRoot)}).toThrow('Please provide a callback function for levelOrder');
    });

    test('levelOrder array calls callback for each item in order', () => {
        tree.levelOrder(tree.getTreeRoot(), addToTestArray);
        expect(testArray).toStrictEqual([8, 4, 23, 1, 7, 9]);
    });
});

describe('Inserting and deleting nodes', () => {
    test('Insert inserts node with that value at leaf', () => {
        tree.insert(5);
        // Check with an inorder traversal
        expect(tree.inorder(tree.getTreeRoot())).toStrictEqual([5, 1, 4, 7, 8, 9, 23]);
        // Check with level order traversal 
        tree.levelOrder(tree.getTreeRoot(), addToTestArray);
        expect(testArray).toStrictEqual([8, 4, 23, 1, 7, 9, 5]);
    });
    test('Insert: Not passing in a value results in an error', () => {
        expect(() => tree.insert()).toThrow('Please specify a value to insert');
    });
    test('Delete: Not passing in a value results in an error', () => {
        expect(() => tree.deleteNode()).toThrow('Please specify a value to delete');
    });
    test('Deleting a node which is a leaf of the tree', () => {
        tree.deleteNode(1);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray)
        expect(testArray).toStrictEqual([8, 4, 23, 7, 9]);
    });
    test('Deleting a node which is a leaf of the tree, test 2', () => {
        tree.deleteNode(7);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray)
        expect(testArray).toStrictEqual([8, 4, 23, 1, 9]);
    });
    test('Deleting a node which has one child', () => {
        tree.deleteNode(23);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray);
        expect(testArray).toStrictEqual([8, 4, 9, 1, 7]);
    });
    test('Deleting a node which has two children', () => {
        tree.deleteNode(4);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray);
        expect(testArray).toStrictEqual([8, 7, 23, 1, 9]);
    });
    test('Deleting the root node', () => {
        tree.deleteNode(8);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray);
        expect(testArray).toStrictEqual([9, 4, 23, 1, 7]);
    });
});

describe('Height & depth', () => {
    test('Height is correct for root node', () => {
        expect(tree.height(tree.getTreeRoot())).toBe(2);
    });
    test('Height is correct for node within tree', () => {
        expect(tree.height(tree.find(23))).toBe(1);
    });
    test('Depth is correct for root node', () => {
        expect(tree.depth(tree.getTreeRoot())).toBe(0)
    });
    test('Depth is correct for node within tree', () => {
        expect(tree.depth(tree.find(9))).toBe(2);
    });
});
describe('Balancing', () => {
    test('isBalanced throws an error if the tree is empty', () => {
        tree = Tree();
        expect(() => { tree.isBalanced() }).toThrow('Tree is empty');
    });
    test('isBalanced returns true for default tree', () => {
        expect(tree.isBalanced()).toBe(true);
    });
    test('isBalanced returns false for unbalanced tree', () => {
        tree.insert(40);
        tree.insert(50);
        tree.insert(60);
        expect(tree.isBalanced()).toBe(false);
    });
    test('rebalance throws error if tree is empty', () => {
        tree = Tree();
        expect(() => tree.rebalance()).toThrow('Tree is empty');
    });
    test('rebalance balances unbalanced tree', () => {
        tree.insert(40);
        tree.insert(50);
        tree.insert(60);
        expect(tree.isBalanced()).toBe(false);
        tree.rebalance();
        expect(tree.isBalanced()).toBe(true);
    });
});