/*
A Thief has a knapsack that can hold X lbs of stolen goods
Each stolen good is worth a certain amount of cash, but
the stolen good also weighs a certain weight. This means that
the thief has to pick an optimal combination of items!
The Thief can't pick the same item twice.

What is the maximum worth of goods that the thief can steal?
*/

/* each item can be represented as an object:
item = {
  val:
  weight:
}

knapsack can be represented as a Set of items (because in Set each is unique)

totalWeight must be <= X
totalVal must be optimized
*/

// input: 1) num lbs knapsack can carry and 2) set of possible goods to be stolen
// output: maximum total value of goods thief can take

// x = Number of lbs thief's knapsack can hold
// items = Set of possible stolen goods thief might choose to steal, where each item
// is an object with val property and weight property

function thiefsKnapsack (x, items) {
  // sort items by value
  const sorted = items.sort((a, b) => a.val < b.val ? -1 : 1);

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
  console.log(groupVals);
  return groupVals[0];
}

let items = [
  { val: 5, weight: 5 },
  { val: 2, weight: 1 },
  { val: 2, weight: 3 },
  { val: 6, weight: 9 }
];

console.log(thiefsKnapsack(10, items));