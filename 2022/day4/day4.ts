import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const input = fileInput.split("\n").map((x) => x.split(","));

let count1 = 0;

for (let i = 0; i < input.length; i++) {
  const [lower1, higher1] = input[i][0].split("-");
  const [lower2, higher2] = input[i][1].split("-");
  if (+lower1 >= +lower2 && +higher1 <= +higher2) {
    count1++;
  } else if (+lower2 >= +lower1 && +higher2 <= +higher1) {
    count1++;
  }
}

console.log("answer 1:", count1);

let count2 = 0;

for (let i = 0; i < input.length; i++) {
  const [lower1, higher1] = input[i][0].split("-");
  const [lower2, higher2] = input[i][1].split("-");
  if (+lower1 >= +lower2 && +higher1 <= +higher2) {
    count2++;
  } else if (+lower2 >= +lower1 && +higher2 <= +higher1) {
    count2++;
  } else if (+lower1 >= +lower2 && +lower1 <= +higher2) {
    count2++;
  } else if (+higher1 >= +lower2 && +higher1 <= +higher2) {
    count2++;
  }
}

console.log("answer 2:", count2);
