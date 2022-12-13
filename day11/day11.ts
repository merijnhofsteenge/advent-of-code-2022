import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const monkeys = fileInput.split("\n\n").map((x) => x.split("\n"));

const numberRegex = /[0-9]+/g;

const solution = (numberRounds: number, isPartTwo?: boolean) => {
  const monkeyObject: any = {};

  const newMonkey = (
    items: number[],
    operationString: string,
    divisor: number,
    throwTrue: number,
    throwFalse: number,
    monkeyNumber: number,
    totalMonkeys: number
  ) => {
    return {
      number: monkeyNumber,
      items: items.map((x) => Array(totalMonkeys).fill(x)),
      count: 0,
      divisor: divisor,
      operation: Function("old", "return " + operationString),
      test: function () {
        for (const item of this.items) {
          this.count++;
          let newItem = item.map((x) => this.operation(+x));
          if (isPartTwo) {
            for (let i = 0; i < item.length; i++) {
              newItem[i] %= monkeyObject[i].divisor;
            }
          } else {
            newItem = newItem.map((x) => Math.floor(x / 3));
          }

          if (newItem[this.number] % this.divisor === 0) {
            monkeyObject[throwTrue].items.push(newItem);
          } else {
            monkeyObject[throwFalse].items.push(newItem);
          }
        }
      },
    };
  };

  for (const input of monkeys) {
    const totalMonkeys = monkeys.length;
    // @ts-ignore
    const monkeyNumber = input[0].match(numberRegex)[0];
    const items = input[1].match(numberRegex);
    const operation = input[2].slice(input[2].search("=") + 1);
    // @ts-ignore
    const divisor = input[3].match(numberRegex)[0];
    // @ts-ignore
    const throwTrue = input[4].match(numberRegex)[0];
    // @ts-ignore
    const throwFalse = input[5].match(numberRegex)[0];
    monkeyObject[monkeyNumber] = newMonkey(
      // @ts-ignore
      items,
      operation,
      divisor,
      throwTrue,
      throwFalse,
      monkeyNumber,
      totalMonkeys
    );
  }

  for (let j = 0; j < numberRounds; j++) {
    for (let i = 0; i < Object.keys(monkeyObject).length; i++) {
      monkeyObject[i].test();
      monkeyObject[i].items = [];
    }
  }

  const countArray = [];
  for (let i = 0; i < Object.keys(monkeyObject).length; i++) {
    countArray.push(monkeyObject[i].count);
  }

  const sortArray = countArray.sort((a, b) => b - a);
  return sortArray[0] * sortArray[1];
};

console.log(solution(20, false));
console.log(solution(10000, true));
