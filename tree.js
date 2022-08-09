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

    function find(value) {
        // Return null if no search value was provided. 
        if (!value) return null;
        // Otherwise, iterate on the nodes until the value is found; start at root.
        let currentNode = treeRoot;
        
        while(currentNode != null) {
            if (currentNode.data === value) return currentNode;
            // Change node to examine based on search value
            currentNode = currentNode.data < value ? currentNode.right : currentNode.left;
        }
        // Will return null if whole loop goes through w/o match
        return currentNode;
    }

    function inorder(root, callback) {
        const results = [];
        if (root === null) return null;

        // Initialize a stack
        const stack = [];
        let current = root;

        while (current !== null || stack.length > 0) {
            // Add root to stack & get things moving
            if (current !== null ) {
                stack.push(current);
                current = current.left;
            } else {
                // Handling top element of the stack
                current = stack.pop();
                results.push(current.data);
                // If a callback was provided, call it here.
                if (callback) callback(current);

                current = current.right;
            }
        }
        return results;
    }

    function preorder(root) {
        const results = [];
        if (root === null) return null;

        // Initialize a stack
        const stack = [root];

        while (stack.length > 0) {
            // Handle top element of the stack
            const current = stack.pop();
            // Add its data to results
            results.push(current.data);
            // Add right child to stack 
            if (current.right) stack.push(current.right);
            // Add left child to stack
            if (current.left) stack.push(current.left);
        }
        // When the loop is done, return results. 
        return results;
    }   

    function postorder(root) {
        const results = [];
        if (root === null) return null;

        // Initialize a stack
        const stack = [root];

        while (stack.length > 0) {
            // Handle top element of the stack
            const current = stack.pop();
            // Add left child to stack
            if (current.left) stack.push(current.left);
            // Add right child to stack 
            if (current.right) stack.push(current.right);
            // Handle data
            results.unshift(current.data);
        }
        // When the loop is done, return results. 
        return results;
    }

    function levelOrder(root, callback) {
        if (!callback) throw new Error('Please provide a callback function for levelOrder');
        
        // Initialize a queue 
        const queue = [root];
        let current = root;

        while (queue.length > 0) {
            current = queue.shift(); // First In First Out!
            // Execute callback function passing in current item from queue
            callback(current);
            // Add next nodes to queue. 
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
    
    function insert(value) {
        if (value === undefined) throw new Error('Please specify a value to insert');

        // To use in while loop
        let current = treeRoot;

        while (current.left !== null || current.right !== null) {
            if (current.left !== null) {
                current = current.left;
            } else if (current.right !== null) {
                current = current.right;
            }
        }
        
        // Node to add
        current.left = Node(value);
    }

    function deleteNode(value) {
        if (value === undefined) throw new Error('Please specify a value to delete');

        // Find node which has the specified value & its parent. 
        let parent = findParent(value);
        let nodeToDelete = find(value);
        
        // If the node is childless, just delete it (set to null)
        if (nodeToDelete.left === null && nodeToDelete.right === null) {
            if (parent.left.data === value) {
                parent.left = null;
            } else if (parent.right.data === value) {
                parent.right = null;
            }

        } else if (nodeToDelete.left !== null && nodeToDelete.right!== null) {
        // If the node has two children, find inorder successor
        const inorderArray = inorder(nodeToDelete);
        const successorData = inorderArray[inorderArray.findIndex((elem) => elem === value) + 1];
        // delete successor
        parent = findParent(successorData);
        if (parent.left.data === successorData) {
            parent.left = null;
        } else if (parent.right.data === successorData) {
            parent.right = null;
        }
        // copy successor data to node. 
        nodeToDelete.data = successorData;
        
        } else {
        // If the node has one child, copy child to node and delete child.

        }

    }

    function findParent(value) {
        let currentNode = treeRoot;
        
        while(currentNode != null) {
            if (currentNode.left.data === value || 
                currentNode.right.data === value) {
                    return currentNode;
            }
            // Advance in the tree based on value
            currentNode = currentNode.data < value ? currentNode.right : currentNode.left;
        }

        return null;
    }

    return {
        getTreeRoot,
        prepareArray,
        buildTree,
        find,
        inorder,
        preorder,
        postorder,
        levelOrder,
        insert,
        deleteNode,
    }
}

module.exports = Tree;