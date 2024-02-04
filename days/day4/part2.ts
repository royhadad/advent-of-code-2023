import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const lines: string[] = input.split("\n");

console.log(lines);

console.log("done");
