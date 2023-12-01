import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

let input = fileInput.split("\n");

const storedTrees = Array(input.length)
  .fill(0)
  .map(() => Array(input[0].length).fill(0));

for (let i = 0; i < input.length; i++) {
  let highestFromLeft = -1;
  let highestFromRight = -1;
  let highestFromTop = -1;
  let highestFromBottom = -1;
  for (let j = 0; j < input[0].length; j++) {
    if (+input[i][j] > highestFromLeft) {
      storedTrees[i][j] = 1;
      highestFromLeft = +input[i][j];
    }
    if (+input[j][i] > highestFromTop) {
      storedTrees[j][i] = 1;
      highestFromTop = +input[j][i];
    }
    if (+input[i][input.length - j - 1] > highestFromRight) {
      storedTrees[i][input.length - j - 1] = 1;
      highestFromRight = +input[i][input.length - j - 1];
    }
    if (+input[input.length - j - 1][i] > highestFromBottom) {
      storedTrees[input.length - j - 1][i] = 1;
      highestFromBottom = +input[input.length - j - 1][i];
    }
  }
}

const answer1 = storedTrees
  .map((x) => x.reduce((a, b) => a + b, 0))
  .reduce((a, b) => a + b, 0);

console.log("answer 1:", answer1);

const scenicView = Array(input.length)
  .fill(0)
  .map(() => Array(input[0].length).fill(0));

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    let viewLeft = 0;
    let viewRight = 0;
    let viewUp = 0;
    let viewDown = 0;

    let k = j + 1;
    while (k < input.length && +input[i][j] > +input[i][k]) {
      viewRight++;
      k++;
    }
    if (k < input.length) {
      viewRight++;
    }

    k = j - 1;
    while (k >= 0 && +input[i][j] > +input[i][k]) {
      viewLeft++;
      k--;
    }
    if (k >= 0) {
      viewLeft++;
    }

    k = i + 1;
    while (k < input.length && +input[i][j] > +input[k][j]) {
      viewDown++;
      k++;
    }
    if (k < input.length) {
      viewDown++;
    }

    k = i - 1;
    while (k >= 0 && +input[i][j] > +input[k][j]) {
      viewUp++;
      k--;
    }
    if (k >= 0) {
      viewUp++;
    }

    scenicView[i][j] = viewRight * viewLeft * viewDown * viewUp;
  }
}

const answer2 = scenicView
  .map((row) => row.reduce((a, b) => (b > a ? b : a), 0))
  .reduce((a, b) => (b > a ? b : a), 0);

console.log("answer 2:", answer2);
