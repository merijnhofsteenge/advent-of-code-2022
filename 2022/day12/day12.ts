import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

let input = fileInput.split("\n");

const start = [0, 0];
const end = [0, 0];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "S") {
      start[0] = i;
      start[1] = j;
      input[i] = input[i].replace("S", "a");
    }
    if (input[i][j] === "E") {
      end[0] = i;
      end[1] = j;
      input[i] = input[i].replace("E", "z");
    }
  }
}

let lowestNumMoves = 99999;
let fewestMoveArray = Array(input.length)
  .fill(99999)
  .map(() => Array(input[0].length).fill(99999));

const move = (coord: number[], counter: number, answer2: boolean) => {
  if (counter > lowestNumMoves) {
    return;
  }

  if (
    (answer2 && input[coord[0]][coord[1]] === "a") ||
    (coord[0] === start[0] && coord[1] === start[1])
  ) {
    if (counter < lowestNumMoves) {
      lowestNumMoves = counter;
    }
    return;
  }

  const nextCoords = [
    [coord[0] - 1, coord[1]],
    [coord[0] + 1, coord[1]],
    [coord[0], coord[1] - 1],
    [coord[0], coord[1] + 1],
  ];

  for (const nextCoord of nextCoords) {
    if (walkNextCoord(coord, nextCoord, counter)) {
      fewestMoveArray[nextCoord[0]][nextCoord[1]] = counter;
      move(nextCoord, counter + 1, answer2);
    }
  }
};

const walkNextCoord = (
  coord: number[],
  nextCoord: number[],
  counter: number
) => {
  if (
    nextCoord[0] >= 0 &&
    nextCoord[0] < input.length &&
    nextCoord[1] >= 0 &&
    nextCoord[1] < input[0].length
  ) {
    if (
      allowedMove(
        input[coord[0]][coord[1]],
        input[nextCoord[0]][nextCoord[1]]
      ) &&
      counter < fewestMoveArray[nextCoord[0]][nextCoord[1]]
    ) {
      return true;
    }
  }
  return false;
};

const allowedMove = (stepFrom: string, stepTo: string) => {
  return stepTo.charCodeAt(0) + 1 >= stepFrom.charCodeAt(0);
};

move(end, 0, false);
console.log("answer 1:", lowestNumMoves);

lowestNumMoves = 99999;
fewestMoveArray = Array(input.length)
  .fill(99999)
  .map(() => Array(input[0].length).fill(99999));
move(end, 0, true);
console.log("answer 2:", lowestNumMoves);
