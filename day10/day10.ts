import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const input = fileInput.split("\n");

const instructions = input.map((x) => x.split(" "));

let cycle = 0;
let x = 1;
let answerArray = [
  [20, null],
  [60, null],
  [100, null],
  [140, null],
  [180, null],
  [220, null],
];

for (let i = 0; i < instructions.length; i++) {
  if (instructions[i][0] === "addx") {
    cycle += 2;
    for (const value of answerArray) {
      // @ts-ignore
      if (value[1] === null && cycle >= value[0]) {
        answerArray = answerArray.map((el) => {
          // @ts-ignore
          return el.includes(value[0]) ? [value[0], value[0] * x] : el;
        });
      }
    }
    x += +instructions[i][1];
  } else {
    cycle++;
  }
}

// @ts-ignore
const answer1 = answerArray.map((x) => x[1]).reduce((a, b) => a + b, 0);
console.log("answer 1:", answer1);

x = 1;
let nextAddCycle = 0;
let xAtNextAddCycle = 1;
let instructionNumber = 0;
let currentString = "";
const stringArray = [];
for (let i = 0; i < 240; i++) {
  if (i === nextAddCycle) {
    x = xAtNextAddCycle;
    if (instructions[instructionNumber][0] === "addx") {
      nextAddCycle += 2;
      xAtNextAddCycle = x + +instructions[instructionNumber][1];
    } else {
      nextAddCycle++;
    }
    instructionNumber++;
  }

  if (i % 40 <= x + 1 && i % 40 >= x - 1) {
    currentString = currentString.concat("█");
  } else {
    currentString = currentString.concat(" ");
  }

  if (i % 40 === 39) {
    stringArray.push(currentString);
    currentString = "";
  }
}

console.log("answer 2: ");
for (const value of stringArray) {
  console.log(value);
}
