const HashMap = require('./hashmap/hashMap');
const { Tree } = require('./binary-search-tree/tree');
const { knightMoves } = require('./knights-travails/knightTravails');

console.log('--- HashMap Demo ---');
const map = new HashMap();
map.set('name', 'Odin');
map.set('course', 'JavaScript');
map.set('project', 'HashMap');
console.log('entries:', map.entries());
console.log('has("name"):', map.has('name'));
console.log('get("course"):', map.get('course'));

console.log('\n--- Binary Search Tree Demo ---');
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log('isBalanced:', tree.isBalanced());
console.log('levelOrder:', tree.levelOrder());
tree.insert(1000);
tree.insert(2000);
tree.insert(3000);
console.log('isBalanced after inserts:', tree.isBalanced());
tree.rebalance();
console.log('isBalanced after rebalance:', tree.isBalanced());

console.log('\n--- Knight Travails Demo ---');
const path = knightMoves([0, 0], [7, 7]);
console.log(`Moves required: ${path.length - 1}`);
console.log('Path:', path);
