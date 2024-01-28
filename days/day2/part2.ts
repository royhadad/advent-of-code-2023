import fs from "fs";
import { Game, parseInput } from "./parser";

console.log("started");

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();
const games = parseInput(input);

const sumOfPowerOfCubes = games.reduce((acc, curr) => acc + getPowerOfCubes(curr), 0);

console.log(sumOfPowerOfCubes);

console.log("done");

function getPowerOfCubes(game: Game): number {
  const { red, blue, green } = getMinimumNumberOfCubes(game);
  return red * blue * green;
}

function getMinimumNumberOfCubes(game: Game): { red: number; green: number; blue: number } {
  return {
    red: Math.max(...game.rounds.map((round) => round.red)),
    blue: Math.max(...game.rounds.map((round) => round.blue)),
    green: Math.max(...game.rounds.map((round) => round.green)),
  };
}
