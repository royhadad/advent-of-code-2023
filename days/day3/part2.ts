import fs from "fs";
import { add, uniqWith, isEqual } from "lodash";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const lines: string[] = input.split("\n");

const gearRatios: number[] = [];

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  for (let columnIndex = 0; columnIndex < lines[lineIndex].length; columnIndex++) {
    const currentChar = lines[lineIndex][columnIndex];
    if (isAstrix(currentChar)) {
      const numbersAdjacentToAstrix: number[] = getNumbersAdjacentToAstrix(lines, {
        line: lineIndex,
        column: columnIndex,
      });
      if (numbersAdjacentToAstrix.length === 2) {
        // it is a gear
        const gearRatio = numbersAdjacentToAstrix[0] * numbersAdjacentToAstrix[1];
        gearRatios.push(gearRatio);
      }
    }
  }
}

const sumOfGearRatios = gearRatios.reduce((acc, current) => acc + current, 0);

console.log(sumOfGearRatios);

console.log("done");

function getNumbersAdjacentToAstrix(lines: string[], astrixPosition: Position): number[] {
  const coordinatesOfNumbersAdjacentToAstrix: { startIndex: number; endIndex: number; lineIndex: number }[] = [];
  for (const [lineDiff, columnDiff] of [
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
  ]) {
    const currentPosition: Position = {
      line: astrixPosition.line + lineDiff,
      column: astrixPosition.column + columnDiff,
    };
    if (
      currentPosition.line < 0 ||
      currentPosition.line >= lines.length ||
      currentPosition.column < 0 ||
      currentPosition.column >= lines[currentPosition.line].length
    ) {
      // if it's out of bounds, skip this position
      continue;
    }

    if (isDigit(lines[currentPosition.line][currentPosition.column])) {
      const { startIndex, endIndex } = getCoordinatesOfTheNumberTheDigitBelongsTo(
        lines[currentPosition.line],
        currentPosition.column
      );
      coordinatesOfNumbersAdjacentToAstrix.push({ startIndex, endIndex, lineIndex: currentPosition.line });
    }
  }

  // remove numbers with identical coordinates and parse them to a numerical value
  const numbersAdjacentToAstrix = uniqWith(coordinatesOfNumbersAdjacentToAstrix, isEqual).map(
    ({ startIndex, endIndex, lineIndex }) => {
      return parseInt(lines[lineIndex].substring(startIndex, endIndex + 1));
    }
  );
  return numbersAdjacentToAstrix;
}

function getCoordinatesOfTheNumberTheDigitBelongsTo(
  line: string,
  digitIndex: number
): { startIndex: number; endIndex: number } {
  // finding the number's first index
  let startIndex = digitIndex;
  while (startIndex >= 1) {
    if (!isDigit(line[startIndex - 1])) {
      break;
    }
    startIndex--;
  }

  // finding the number's last index
  let endIndex = digitIndex;
  while (endIndex < line.length - 1) {
    if (!isDigit(line[endIndex + 1])) {
      break;
    }
    endIndex++;
  }

  return { startIndex, endIndex };
}

function isAstrix(char: string): boolean {
  return getCharType(char) === "astrix";
}

function isDigit(char: string): boolean {
  return getCharType(char) === "digit";
}

type Position = { line: number; column: number };
type CharType = "empty" | "digit" | "symbol" | "astrix";

function getCharType(char: string): CharType {
  if (char === ".") {
    return "empty";
  }
  if (!isNaN(parseInt(char))) {
    return "digit";
  }
  if (char === "*") {
    return "astrix";
  }
  return "symbol";
}
