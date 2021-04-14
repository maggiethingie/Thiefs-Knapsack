/*
A Thief has a knapsack that can hold X lbs of stolen goods
Each stolen good is worth a certain amount of cash, but
the stolen good also weighs a certain weight. This means that
the thief has to pick an optimal combination of items!
The Thief can't pick the same item twice.

What is the maximum worth of goods that the thief can steal?
*/

/* input: 1) num lbs knapsack can carry and 2) set of possible goods to be stolen
   output: maximum total value of goods thief can take

x = Number of lbs thief's knapsack can hold
items = array of possible stolen goods thief might choose to steal (where each item
is an object with val property and weight property
*/

// solution 1 (passes 2/3 of my tests):
function thiefsKnapsack1 (x, items) {
  const sorted = items.sort((a, b) => a.val > b.val ? -1 : 1);
  //console.log(sorted);
  let groupVals = [];

  let n = items.length;
  let i = 0;

  while (i < items.length) {
    while (n > i) {
      let sumWeight = items.slice(i, n).reduce((acc, cur) => acc + cur.weight, 0);
      if (sumWeight <= x) {
        let sumVal = items.slice(i, n).reduce((acc, cur) => acc + cur.val, 0);
        groupVals.push(sumVal);
      }
      n --;
    }
    n = items.length;
    i ++;
  }

  groupVals = groupVals.sort((a, b) => a > b ? -1 : 1);
  //console.log(groupVals);
  return groupVals[0];
}

//solution 2 (passes 3/3 of my tests but perhaps my tests aren't thorough enough):
function thiefsKnapsack2 (x, items) {
  items = items.sort((a, b) => a.val < b.val ? -1 : 1);

  let totalWeight = getWeight(items);
  let totalVal = getVal(items);
  let groupVals = [];

  while (totalWeight > x) {
    //console.log(items);
    for (let i = 0; i < items.length; i ++) {
      let tempItems = items.slice(0, i).concat(items.slice(i + 1));
      if (getWeight(tempItems) <= x) {
        groupVals.push(getVal(tempItems));
      }
    }
    totalWeight -= items[0].weight;
    totalVal -= items[0].val;
    items = items.slice(1);
  }

  groupVals = groupVals.sort((a, b) => a > b ? -1 : 1);
  //console.log(groupVals);
  return groupVals[0];
}

function getWeight (items) {
  return items.reduce((acc, cur) => acc + cur.weight, 0);
}

function getVal (items) {
  return items.reduce((acc, cur) => acc + cur.val, 0);
}

console.log('* TESTS *');
let items = [
  { val: 5, weight: 5 },
  { val: 2, weight: 1 },
  { val: 2, weight: 3 },
  { val: 6, weight: 9 }
];

console.log(thiefsKnapsack2(10, items), 'should be 9');

items = [
  { val: 5, weight: 5 },
  { val: 20, weight: 1 },
  { val: 2, weight: 1 },
  { val: 5, weight: 8 }
];

console.log(thiefsKnapsack2(10, items), 'should be 27');

items = [
  { val: 14, weight: 2 },
  { val: 7, weight: 4 },
  { val: 9, weight: 5 },
  { val: 23, weight: 6 }
];

console.log(thiefsKnapsack2(10, items), 'should be 37');