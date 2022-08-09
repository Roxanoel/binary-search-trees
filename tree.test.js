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
    test.only('Deleting a node which is a leaf of the tree', () => {
        tree.deleteNode(1);
        // Check with level order traversal
        tree.levelOrder(tree.getTreeRoot(), addToTestArray)
        expect(testArray).toStrictEqual([8, 4, 23, 7, 9]);
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
        expect(tree.levelOrder(tree.getTreeRoot(), addToTestArray)).toStrictEqual([9, 4, 23, 1, 7]);
    });
});

describe.skip('Height & depth', () => {

});
describe.skip('Balancing', () => {

});