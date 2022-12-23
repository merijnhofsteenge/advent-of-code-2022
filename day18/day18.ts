import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const coords = fileInput.split("\n").map((x) => x.split(",").map((x) => +x));

const vol = Array(50)
  .fill(0)
  .map(() =>
    Array(50)
      .fill(0)
      .map(() => Array(50).fill(0))
  );

for (const coord of coords) {
  if (coord[1] !== undefined) {
    vol[coord[0] + 1][coord[1] + 1][coord[2] + 1] = 1;
  }
}

const sum = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0);
};

let numberof1 = 0;

for (const yz of vol) {
  for (const z of yz) {
    numberof1 += sum(z);
  }
}

let total = 0;

for (let x = 0; x < vol.length; x++) {
  for (let y = 0; y < vol[0].length; y++) {
    let currentVal = 0;
    for (let z = 0; z < vol[0][0].length; z++) {
      if (vol[x][y][z] !== currentVal) {
        total++;
        currentVal = vol[x][y][z];
      }
    }
  }
}

for (let x = 0; x < vol.length; x++) {
  for (let z = 0; z < vol[0][0].length; z++) {
    let currentVal = 0;
    for (let y = 0; y < vol[0].length; y++) {
      if (vol[x][y][z] !== currentVal) {
        total++;
        currentVal = vol[x][y][z];
      }
    }
  }
}

for (let y = 0; y < vol.length; y++) {
  for (let z = 0; z < vol[0][0].length; z++) {
    let currentVal = 0;
    for (let x = 0; x < vol.length; x++) {
      if (vol[x][y][z] !== currentVal) {
        total++;
        currentVal = vol[x][y][z];
      }
    }
  }
}

console.log(total);
