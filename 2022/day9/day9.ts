import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

let input = fileInput.split("\n");

let moves = input.map((x) => x.split(" "));

//question 1
let tailArray = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

let xh = 500;
let yh = 500;
let xt = 500;
let yt = 500;
tailArray[xt][yt] = 1;

for (let step = 0; step < moves.length; step++) {
  for (let move = 0; move < +moves[step][1]; move++) {
    if (moves[step][0] === "R") {
      xh++;
      if (xh > xt + 1) {
        xt++;
        yt = yh;
        tailArray[xt][yt] = 1;
      }
    }
    if (moves[step][0] === "L") {
      xh--;
      if (xh < xt - 1) {
        xt--;
        yt = yh;
        tailArray[xt][yt] = 1;
      }
    }
    if (moves[step][0] === "D") {
      yh++;
      if (yh > yt + 1) {
        yt++;
        xt = xh;
        tailArray[xt][yt] = 1;
      }
    }
    if (moves[step][0] === "U") {
      yh--;
      if (yh < yt - 1) {
        yt--;
        xt = xh;
        tailArray[xt][yt] = 1;
      }
    }
  }
}

const answer1 = tailArray
  .map((x) => x.reduce((a, b) => a + b, 0))
  .reduce((a, b) => a + b, 0);
console.log("answer 1:", answer1);

//question 2
tailArray = Array(1000)
  .fill(0)
  .map(() => Array(1000).fill(0));

const pos = Array(10)
  .fill(0)
  .map(() => Array(2).fill(500));

tailArray[pos[9][0]][pos[9][1]] = 1;

for (let step = 0; step < moves.length; step++) {
  for (let move = 0; move < +moves[step][1]; move++) {
    if (moves[step][0] === "R") {
      pos[0][0]++;
    }
    if (moves[step][0] === "L") {
      pos[0][0]--;
    }
    if (moves[step][0] === "D") {
      pos[0][1]++;
    }
    if (moves[step][0] === "U") {
      pos[0][1]--;
    }
    let tailMoved = false;
    for (let i = 1; i < pos.length; i++) {
      if (pos[i - 1][0] > pos[i][0] + 1) {
        pos[i][0]++;
        if (pos[i - 1][1] > pos[i][1]) {
          pos[i][1]++;
        }
        if (pos[i - 1][1] < pos[i][1]) {
          pos[i][1]--;
        }
        if (i === 9) {
          tailMoved = true;
        }
      }
      if (pos[i - 1][0] < pos[i][0] - 1) {
        pos[i][0]--;
        if (pos[i - 1][1] > pos[i][1]) {
          pos[i][1]++;
        }
        if (pos[i - 1][1] < pos[i][1]) {
          pos[i][1]--;
        }
        if (i === 9) {
          tailMoved = true;
        }
      }
      if (pos[i - 1][1] > pos[i][1] + 1) {
        pos[i][1]++;
        if (pos[i - 1][0] > pos[i][0]) {
          pos[i][0]++;
        }
        if (pos[i - 1][0] < pos[i][0]) {
          pos[i][0]--;
        }
        if (i === 9) {
          tailMoved = true;
        }
      }
      if (pos[i - 1][1] < pos[i][1] - 1) {
        pos[i][1]--;
        if (pos[i - 1][0] > pos[i][0]) {
          pos[i][0]++;
        }
        if (pos[i - 1][0] < pos[i][0]) {
          pos[i][0]--;
        }
        if (i === 9) {
          tailMoved = true;
        }
      }
    }
    if (tailMoved) {
      tailArray[pos[9][0]][pos[9][1]] = 1;
    }
  }
}

const answer2 = tailArray
  .map((x) => x.reduce((a, b) => a + b, 0))
  .reduce((a, b) => a + b, 0);
console.log("answer 2:", answer2);
