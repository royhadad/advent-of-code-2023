import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const lines: string[] = input.split("\n");

const calibrationValues: number[] = lines.map((line) => {
  const firstNumber = getFirstNumber(line);
  const lastNumber = getLastNumber(line);
  return parseInt(firstNumber.toString() + lastNumber.toString());
});

const sumOfCalibrationValues = calibrationValues.reduce((acc, curr) => acc + curr, 0);

console.log(sumOfCalibrationValues);

console.log("done");

function getFirstNumber(line: string): number {
  const firstNumber = line.split("").find((char) => {
    return !isNaN(parseInt(char));
  });
  if (firstNumber === undefined) {
    throw new Error("first number not found");
  }
  return parseInt(firstNumber);
}

function getLastNumber(line: string): number {
  const lastNumber = line
    .split("")
    .reverse()
    .find((char) => {
      return !isNaN(parseInt(char));
    });
  if (lastNumber === undefined) {
    throw new Error("last number not found");
  }
  return parseInt(lastNumber);
}
