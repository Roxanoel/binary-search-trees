const Tree = require('./tree');

let tree;
beforeEach(() => {
    tree = Tree();
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
describe('Inserting and deleting nodes', () => {

});
describe.skip('levelOrder traversal', () => {
    // Write a mock function to use as callback parameter?
});
describe.skip('Inorder, preorder, and postoder traversal', () => {

});
describe.skip('Height & depth', () => {

});
describe.skip('Balancing', () => {

});