import { readFileSync } from "fs";

const stacks1 = [
  "",
  "SZPDLBFC",
  "NVGPHWB",
  "FWBJG",
  "GJNFLWCS",
  "WJLTPMSH",
  "BCWGFS",
  "HTPMQBW",
  "FSWT",
  "NCR",
];

const stacks2 = [
  "",
  "SZPDLBFC",
  "NVGPHWB",
  "FWBJG",
  "GJNFLWCS",
  "WJLTPMSH",
  "BCWGFS",
  "HTPMQBW",
  "FSWT",
  "NCR",
];

const fileInput = readFileSync("./input.txt", "utf8");

const input = fileInput.split("\n");

let moveArray: number[][] = [];

for (let i = 0; i < input.length; i++) {
  moveArray[i] = input[i]
    .replace("move ", "")
    .replace("from ", "")
    .replace("to ", "")
    .split(" ")
    .map((x) => +x);
}

let amountToMove;
let strLen;

for (let i = 0; i < moveArray.length; i++) {
  amountToMove = moveArray[i][0];
  strLen = stacks1[moveArray[i][1]].length;
  stacks1[moveArray[i][2]] += stacks1[moveArray[i][1]]
    .slice(strLen - amountToMove)
    .split("")
    .reverse()
    .join("");
  stacks1[moveArray[i][1]] = stacks1[moveArray[i][1]].slice(
    0,
    strLen - amountToMove
  );
}

console.log(
  "answer 1:",
  stacks1
    .map((str) => str[str.length - 1])
    .reduce((a, b) => a.concat(b ? b : ""), "")
);

for (let i = 0; i < moveArray.length; i++) {
  amountToMove = moveArray[i][0];
  strLen = stacks2[moveArray[i][1]].length;
  stacks2[moveArray[i][2]] += stacks2[moveArray[i][1]].slice(
    strLen - amountToMove
  );
  stacks2[moveArray[i][1]] = stacks2[moveArray[i][1]].slice(
    0,
    strLen - amountToMove
  );
}

console.log(
  "answer 2:",
  stacks2
    .map((str) => str[str.length - 1])
    .reduce((a, b) => a.concat(b ? b : ""), "")
);
