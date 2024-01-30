import fs from "fs";
import { parseInput, Hailstone } from "./parser";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const hailstones = parseInput(input);

hailstones.sort((hs1: Hailstone, hs2: Hailstone) => {
  return hs2.position.x - hs1.position.x;
});

console.log(hailstones);

console.log("done");
