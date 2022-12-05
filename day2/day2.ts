import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const puzzleArray = fileInput.split("\n");

let score1 = 0;

for (let i = 0; i < puzzleArray.length; i++) {
  if (puzzleArray[i][0] === "A") {
    if (puzzleArray[i][2] === "X") {
      score1 += 4;
    }
    if (puzzleArray[i][2] === "Y") {
      score1 += 8;
    }
    if (puzzleArray[i][2] === "Z") {
      score1 += 3;
    }
  }
  if (puzzleArray[i][0] === "B") {
    if (puzzleArray[i][2] === "X") {
      score1 += 1;
    }
    if (puzzleArray[i][2] === "Y") {
      score1 += 5;
    }
    if (puzzleArray[i][2] === "Z") {
      score1 += 9;
    }
  }
  if (puzzleArray[i][0] === "C") {
    if (puzzleArray[i][2] === "X") {
      score1 += 7;
    }
    if (puzzleArray[i][2] === "Y") {
      score1 += 2;
    }
    if (puzzleArray[i][2] === "Z") {
      score1 += 6;
    }
  }
}

let score2 = 0;

for (let i = 0; i < puzzleArray.length; i++) {
  if (puzzleArray[i][0] === "A") {
    if (puzzleArray[i][2] === "X") {
      score2 += 3;
    }
    if (puzzleArray[i][2] === "Y") {
      score2 += 4;
    }
    if (puzzleArray[i][2] === "Z") {
      score2 += 8;
    }
  }
  if (puzzleArray[i][0] === "B") {
    if (puzzleArray[i][2] === "X") {
      score2 += 1;
    }
    if (puzzleArray[i][2] === "Y") {
      score2 += 5;
    }
    if (puzzleArray[i][2] === "Z") {
      score2 += 9;
    }
  }
  if (puzzleArray[i][0] === "C") {
    if (puzzleArray[i][2] === "X") {
      score2 += 2;
    }
    if (puzzleArray[i][2] === "Y") {
      score2 += 6;
    }
    if (puzzleArray[i][2] === "Z") {
      score2 += 7;
    }
  }
}

console.log("puzzle 1:", score1);
console.log("puzzle 2:", score2);
