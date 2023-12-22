import { readFileSync } from "fs";

const puzzleInput = readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((input) => input.length > 0);

const exampleInput = readFileSync("./input_example.txt", "utf8")
  .split("\n")
  .filter((input) => input.length > 0);

// change to use example/puzzle input
const input = puzzleInput;

function isStringNumber(char?: string) {
  if (typeof char !== "string") return false;
  return char[0] >= "0" && char[0] <= "9";
}

function isSpecialChar(char: string) {
  if (char.length === 0 || char.length > 1) return false;
  return char !== "." && (char < "0" || char > "9");
}
function isValidNumber(
  input: string[],
  [_, inputLineIndex, inputStartCharIndex, inputEndCharIndex]: [
    number,
    number,
    number,
    number
  ]
) {
  // Check in a rectangle around the number, taking into account that the number could be at an edge of the grid
  const startLineIndex = Math.max(inputLineIndex - 1, 0);
  const endLineIndex = Math.min(inputLineIndex + 1, input.length - 1);
  const startCharIndex = Math.max(inputStartCharIndex - 1, 0);
  const endCharIndex = Math.min(inputEndCharIndex + 1, input[0].length - 1);

  for (let lineIndex = startLineIndex; lineIndex <= endLineIndex; lineIndex++) {
    for (
      let charIndex = startCharIndex;
      charIndex <= endCharIndex;
      charIndex++
    ) {
      if (isSpecialChar(input[lineIndex][charIndex])) {
        return true;
      }
    }
  }
  return false;
}

// [partNumber, lineIndex, startIndex, endIndex][]
const numbersFound: [number, number, number, number][] = [];

for (const [lineIndex, line] of input.entries()) {
  let partNumberString = "";
  let startIndex = 0;
  for (let index = 0; index < line.length; index++) {
    if (isStringNumber(line[index])) {
      // Hacky way to keep track of the start index
      if (startIndex === 0) {
        startIndex = index;
      }
      // Keep the number as a string to convert to number later
      partNumberString += line[index];
    } else if (partNumberString.length > 0) {
      // End of the number is reached, its end index is index-1
      numbersFound.push([+partNumberString, lineIndex, startIndex, index - 1]);
      partNumberString = "";
      startIndex = 0;
    }
  }
  // Edge case for if the number is at the end of the line
  if (partNumberString.length > 0) {
    numbersFound.push([
      +partNumberString,
      lineIndex,
      startIndex,
      line.length - 1,
    ]);
  }
}

const validNumbersSolution1 = numbersFound.filter((numberFound) => {
  return isValidNumber(input, numberFound);
});

const solution1 = validNumbersSolution1.reduce(
  (prev, curr) => prev + curr[0],
  0
);

console.log("solution 1:", solution1);

const gears: [number, number][] = [];
// Find the line and character index of all gears
for (const [index, line] of input.entries()) {
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    if (line[charIndex] === "*") {
      gears.push([index, charIndex]);
    }
  }
}

// For each gear check if there are adjacent numbers: i.e. a number has a close line and close index in its range
const gearNumbers = gears
  .map(([gearLineIndex, gearCharIndex]) => {
    const adjacentNumbers = numbersFound.filter(
      ([_, numberLineIndex, numberCharIndexStart, numberCharIndexEnd]) => {
        // Maximum 1 line difference
        if (Math.abs(gearLineIndex - numberLineIndex) > 1) {
          return false;
        }
        // Gear should be at most 1 left from the start of the number
        if (numberCharIndexStart - gearCharIndex > 1) {
          return false;
        }
        // Gear should be at most 1 right from the end of the number
        if (gearCharIndex - numberCharIndexEnd > 1) {
          return false;
        }
        return true;
      }
    );
    // If a gear has 2 adjacent numbers, return its gear ratio
    if (adjacentNumbers.length === 2) {
      return adjacentNumbers[0][0] * adjacentNumbers[1][0];
    }
    return 0;
  })
  .filter((gearNumber) => gearNumber > 0);

const solution2 = gearNumbers.reduce((prev, curr) => prev + curr, 0);

console.log("solution 2:", solution2);
