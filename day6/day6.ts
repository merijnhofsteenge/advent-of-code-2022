import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");

let answer1 = 0;
let i = 3;

while (i < input.length && answer1 === 0) {
  let solvedFlag = true;
  for (let j = 1; j < 4; j++) {
    for (let k = 0; k < j; k++) {
      if (input[i - j] === input[i - k]) {
        solvedFlag = false;
      }
    }
  }
  if (solvedFlag) {
    answer1 = i + 1;
  }
  i++;
}

let answer2 = 0;
i = 3;

while (i < input.length && answer2 === 0) {
  let solvedFlag = true;
  for (let j = 1; j < 14; j++) {
    for (let k = 0; k < j; k++) {
      if (input[i - j] === input[i - k]) {
        solvedFlag = false;
      }
    }
  }
  if (solvedFlag) {
    answer2 = i + 1;
  }
  i++;
}

console.log("answer 1:", answer1);
console.log("answer 2:", answer2);
