import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const input = fileInput
  .split("\n")
  .map((x) => x.match(/[-0-9]+/g)?.map((x) => (x ? +x : null)));

const question1 = (rowToFind: number) => {
  const coverRow = Array(rowToFind * 5).fill(0);

  let amountOfBeaconsOnRow = 0;
  const beaconsOnRow: any = [];

  for (let i = 0; i < input.length; i++) {
    // @ts-ignore
    const [xSensor, ySensor, xBeacon, yBeacon] = input[i];
    if (yBeacon === rowToFind) {
      let flag = 1;
      for (const beacon of beaconsOnRow) {
        if (beacon[0] === xBeacon && beacon[1] === yBeacon) {
          flag = 0;
        }
      }
      if (flag) {
        amountOfBeaconsOnRow++;
        beaconsOnRow.push([xBeacon, yBeacon]);
      }
    }
    const beaconDistance =
      Math.abs(xSensor - xBeacon) + Math.abs(ySensor - yBeacon);
    const rowDistance = Math.abs(rowToFind - ySensor);
    const indexesToFill = beaconDistance - rowDistance;
    for (let j = -indexesToFill + xSensor; j <= indexesToFill + xSensor; j++) {
      coverRow[j + rowToFind] = 1;
    }
  }
  return coverRow.reduce((a, b) => a + b, 0) - amountOfBeaconsOnRow;
};

console.log("answer 1: ", question1(2000000));

const question2 = (size: number) => {
  const testMissing = (arr: any, min: number, max: number): number => {
    let high = min;
    let highPrev = high - 1;
    while (high !== highPrev) {
      highPrev = high;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] <= high + 1 && arr[i][1] > high) {
          high = arr[i][1];
        }
      }
    }
    if (min <= high && max >= high) {
      return high + 1;
    }
    return -1;
  };

  let testArr: any = [];

  for (let y = 0; y <= size; y++) {
    const rowArr: any = [];
    for (let i = 0; i < input.length; i++) {
      // @ts-ignore
      const [xSensor, ySensor, xBeacon, yBeacon] = input[i];
      const beaconDistance =
        Math.abs(xSensor - xBeacon) + Math.abs(ySensor - yBeacon);
      const rowDistance = Math.abs(y - ySensor);
      const indexesToFill = beaconDistance - rowDistance;
      if (indexesToFill >= 0) {
        rowArr.push([
          xSensor - indexesToFill,
          xSensor + indexesToFill,
          i,
          beaconDistance,
          rowDistance,
        ]);
      }
    }
    testArr.push(rowArr);
  }

  for (let i = 0; i < testArr.length; i++) {
    const res = testMissing(testArr[i], 0, size);
    if (res !== -1) {
      return res * size + i;
    }
  }
  return -1;
};

console.log("answer 2:", question2(4000000));
