import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const pairs = fileInput
  .split("\n\n")
  .map((x) => x.split("\n"))
  .map((x) => x.map((x) => JSON.parse(x)));

for (let i = 0; i < pairs[0][0].length && i < pairs[0][0].length; i++) {
  if (typeof pairs[0][0] === "object") {
    if (typeof pairs[0][1] === "object") {
    }
  }
  if (typeof pairs[0][1] === "object") {
  }
}

const toObj = (num: number): number[] => {
  return [num];
};

const compareFun: any = (a: any, b: any) => {
  for (let i = 0; i < a.length || i < b.length; i++) {
    if (i > a.length - 1) {
      return -1;
    } else if (i > b.length - 1) {
      return 1;
    } else if (typeof a[i] === "object" && typeof b[i] === "object") {
      const interRes = compareFun(a[i], b[i]);
      if (interRes !== 0) {
        return interRes;
      }
    } else if (typeof a[i] === "object") {
      const interRes = compareFun(a[i], toObj(b[i]));
      if (interRes !== 0) {
        return interRes;
      }
    } else if (typeof b[i] === "object") {
      const interRes = compareFun(toObj(a[i]), b[i]);
      if (interRes !== 0) {
        return interRes;
      }
    } else {
      if (a[i] > b[i]) {
        return 1;
      }
      if (a[i] < b[i]) {
        return -1;
      }
    }
  }
  return 0;
};

let correctSum = 0;
for (let i = 0; i < pairs.length; i++) {
  if (compareFun(pairs[i][0], pairs[i][1]) === -1) {
    correctSum += i + 1;
  }
}
console.log("answer 1: ", correctSum);

const pairsStretched = [[[2]], [[6]]];
for (let i = 0; i < pairs.length; i++) {
  pairsStretched.push(pairs[i][0]);
  pairsStretched.push(pairs[i][1]);
}

const sortedArray = pairsStretched.sort((a, b) => compareFun(a, b));

let twoIndex = 0;
let sixIndex = 0;
for (let i = 0; i < sortedArray.length; i++) {
  if (
    typeof sortedArray[i][0] === "object" &&
    sortedArray[i][0].length === 1 &&
    sortedArray[i].length === 1
  ) {
    if (
      typeof sortedArray[i][0][0] === "number" &&
      // @ts-ignore
      sortedArray[i][0][0] === 2
    ) {
      twoIndex = i + 1;
    }
    if (
      typeof sortedArray[i][0][0] === "number" &&
      // @ts-ignore
      sortedArray[i][0][0] === 6
    ) {
      sixIndex = i + 1;
    }
  }
}

console.log("answer 2:", twoIndex * sixIndex);
console.log(twoIndex, sixIndex);
