import { readFileSync } from "fs";

const puzzleInput = readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((input) => input.length > 0);

const exampleInput = readFileSync("./input_example.txt", "utf8")
  .split("\n")
  .filter((input) => input.length > 0);

const gamesAndRounds = puzzleInput.map((game) => {
  const rounds = game.split(":")[1].split(";");
  return rounds.map((round) => {
    const colorArray = round.split(",").map((result) => result.trim());
    return colorArray.reduce(
      (prev, current) => {
        const [score, color] = current.split(" ");
        const typedColor = color as "red" | "green" | "blue";
        prev[typedColor] = +score;
        return prev;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );
  });
});

let solution1 = 0;

for (let [index, roundScores] of gamesAndRounds.entries()) {
  const invalidRound = roundScores.some((roundScore) => {
    return roundScore.red > 12 || roundScore.blue > 14 || roundScore.green > 13;
  });

  if (!invalidRound) solution1 += index + 1;
}

console.log("solution 1:", solution1);

const gamePowers = gamesAndRounds.map((rounds) => {
  let highestRed = 0;
  let highestGreen = 0;
  let highestBlue = 0;
  rounds.forEach(({ red, green, blue }) => {
    if (red > highestRed) highestRed = red;
    if (green > highestGreen) highestGreen = green;
    if (blue > highestBlue) highestBlue = blue;
  });
  return highestRed * highestGreen * highestBlue;
});

const gamePowerSum = gamePowers.reduce(
  (prev, gamePower) => prev + gamePower,
  0
);

console.log("solution 2:", gamePowerSum);
