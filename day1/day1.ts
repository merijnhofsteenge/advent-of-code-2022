import { readFileSync } from "fs";

const puzzleInput = readFileSync("./input.txt", "utf8");

const puzzleArray = puzzleInput.split("\n");

//Exercise 1
let sum1 = 0;
let highestSum = 0;

for (let i = 0; i < puzzleArray.length; i++) {
  if (puzzleArray[i]) {
    sum1 += +puzzleArray[i];
  } else {
    if (sum1 > highestSum) {
      highestSum = sum1;
    }
    sum1 = 0;
  }
}

console.log("answer 1:", highestSum);

//Exercise 2
let sum2 = 0;
let sumArray = [];

for (let i = 0; i < puzzleArray.length; i++) {
  if (puzzleArray[i]) {
    sum2 += +puzzleArray[i];
  } else {
    sumArray.push(sum2);
    sum2 = 0;
  }
}

sumArray.sort((a, b) => b - a);

console.log(
  "answer 2:",
  sumArray.slice(0, 3).reduce((a, b) => a + b, 0)
);
