import { readFileSync } from "fs";

const puzzleInput = readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((input) => input.length > 0);

const stringNumbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getSolution(solution: 1 | 2) {
  const numbers: number[] = puzzleInput.map((line) => {
    const numbersInLine: string[] = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] >= "0" && line[i] <= "9") {
        numbersInLine.push(line[i]);
      }
      if (solution === 2) {
        for (let j = 0; j < stringNumbers.length; j++) {
          const stringNumber = stringNumbers[j];
          if (line.slice(i, i + stringNumber.length) === stringNumber) {
            numbersInLine.push(j.toString());
          }
        }
      }
    }

    return +(numbersInLine[0] + numbersInLine.pop());
  });

  return numbers.reduce((prev, num) => prev + num, 0);
}

console.log("solution 1: ", getSolution(1));
console.log("solution 2: ", getSolution(2));
