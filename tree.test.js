const Tree = require('./tree');

let tree;

beforeEach(() => {
    tree = Tree([1, 7, 4, 23, 8, 9, 4]);
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
    let testArray = [];

    function addToTestArray(item) {
        testArray.push(item);
    }

    beforeEach(() => {
        // Reset the array
        testArray = [];
    });

    test('levelOrder array calls callback for each item in order', () => {
        tree.levelOrder(tree.getTreeRoot, addToTestArray);
        expect(testArray).toStrictEqual([8, 4, 23, 1, 7, 9]);
    });
});

describe.skip('Inserting and deleting nodes', () => {
    
});

describe.skip('Height & depth', () => {

});
describe.skip('Balancing', () => {

});