import { readFileSync } from "fs";

const fileInput = readFileSync("./input.txt", "utf8");

const commands = fileInput.split("\n");

type node = {
  dirName: string;
  dirNumber: number;
  parent: number;
  containingDirs: number[];
  ownDirSize: number;
  totalDirSize: number;
};

let currentDir: number = -1;
let nodeArray: node[] = [];

for (let line = 0; line < commands.length; line++) {
  if (commands[line][0] === "$") {
    if (commands[line][2] === "c") {
      if (commands[line][5] === ".") {
        if (nodeArray[currentDir]["parent"] >= 0) {
          currentDir = nodeArray[currentDir]["parent"];
        }
      } else {
        const newDir = nodeArray.length;
        if (
          currentDir >= 0 &&
          !nodeArray[currentDir]["containingDirs"].includes(newDir)
        ) {
          nodeArray[currentDir]["containingDirs"].push(newDir);
        }
        nodeArray.push({
          dirName: commands[line].slice(5),
          dirNumber: newDir,
          parent: currentDir,
          containingDirs: [],
          ownDirSize: 0,
          totalDirSize: 0,
        });
        currentDir = newDir;
      }
    }
  } else {
    if (commands[line][0] >= "0" && commands[line][0] <= "9") {
      let numberLen = 1;
      while (
        commands[line][numberLen] >= "0" &&
        commands[line][numberLen] <= "9"
      ) {
        numberLen++;
      }
      nodeArray[currentDir]["ownDirSize"] += +commands[line].slice(
        0,
        numberLen
      );
    }
  }
}

let i = 0;
while (nodeArray[0]["totalDirSize"] === 0) {
  if (nodeArray[i]["containingDirs"].length > 0) {
    let areAllSubdirectoriesFull = true;
    let subdirectorySum = 0;
    for (let j = 0; j < nodeArray[i]["containingDirs"].length; j++) {
      if (nodeArray[nodeArray[i]["containingDirs"][j]]["totalDirSize"] > 0) {
        subdirectorySum +=
          nodeArray[nodeArray[i]["containingDirs"][j]]["totalDirSize"];
      } else {
        areAllSubdirectoriesFull = false;
      }
    }
    if (areAllSubdirectoriesFull) {
      nodeArray[i]["totalDirSize"] =
        subdirectorySum + nodeArray[i]["ownDirSize"];
    }
  } else {
    nodeArray[i]["totalDirSize"] = nodeArray[i]["ownDirSize"];
  }

  i++;
  i %= nodeArray.length;
}

let sum = 0;
for (let i = 0; i < nodeArray.length; i++) {
  if (nodeArray[i]["totalDirSize"] < 100000) {
    sum += nodeArray[i]["totalDirSize"];
  }
}

console.log("answer 1:", sum);

const requiredSpace = nodeArray[0]["totalDirSize"] - 40000000;

let bestSpaceSaved = 999999999999;

for (let i = 0; i < nodeArray.length; i++) {
  const dirSpace = nodeArray[i]["totalDirSize"];
  if (dirSpace >= requiredSpace && dirSpace < bestSpaceSaved) {
    bestSpaceSaved = dirSpace;
  }
}

console.log("answer 2:", bestSpaceSaved);
