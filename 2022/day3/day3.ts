import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const input = fileInput.split("\n");

let score1 = 0;

for (let i = 0; i < input.length; i++) {
  const strLen = input[i].length / 2;
  const string1 = input[i].slice(0, strLen);
  const string2 = input[i].slice(strLen);
  const string2regex = new RegExp(string2.split("").join("|"), "g");
  // @ts-ignore
  const matchingChar = string1.match(string2regex)[0];
  if (matchingChar >= "a" && matchingChar <= "z") {
    score1 += matchingChar.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  if (matchingChar >= "A" && matchingChar <= "Z") {
    score1 += matchingChar.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
}

console.log("answer 1:", score1);

let score2 = 0;

for (let i = 0; i < input.length; i += 3) {
  const string1 = input[i];
  const string2 = input[i + 1];
  const string3 = input[i + 2];
  const string2regex = new RegExp(string2.split("").join("|"), "g");
  const matchingChars = string1.match(string2regex);
  // @ts-ignore
  const matchingChar = matchingChars
    .map((x) => (string3.includes(x) ? x : ""))
    .reduce((a, b) => a.concat(b), "")[0];

  if (matchingChar >= "a" && matchingChar <= "z") {
    score2 += matchingChar.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  if (matchingChar >= "A" && matchingChar <= "Z") {
    score2 += matchingChar.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
}

console.log("answer 2:", score2);
