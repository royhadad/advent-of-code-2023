import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const lines: string[] = input.split("\n");

const partNumbers: number[] = [];

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  for (let columnIndex = 0; columnIndex < lines[lineIndex].length; columnIndex++) {
    const currentChar = lines[lineIndex][columnIndex];
    if (isDigit(currentChar) && isDigitNextToSymbol(lines, { line: lineIndex, column: columnIndex })) {
      const line = lines[lineIndex];
      const { startIndex, endIndex } = getIndexesOfTheNumberTheDigitBelongsTo(line, columnIndex);
      const partNumber = parseInt(line.substring(startIndex, endIndex + 1));
      partNumbers.push(partNumber);
      columnIndex = endIndex;
    }
  }
}

const sumOfPartNumbers = partNumbers.reduce((acc, current) => acc + current, 0);

console.log(sumOfPartNumbers);

console.log("done");

function getIndexesOfTheNumberTheDigitBelongsTo(
  line: string,
  digitIndex: number
): { startIndex: number; endIndex: number } {
  // finding the number's starting index
  let startIndex = digitIndex;
  while (startIndex >= 1) {
    if (!isDigit(line[startIndex - 1])) {
      break;
    }
    startIndex--;
  }

  // finding the number's ending index
  let endIndex = digitIndex;
  while (endIndex < line.length - 1) {
    if (!isDigit(line[endIndex + 1])) {
      break;
    }
    endIndex++;
  }

  return { startIndex, endIndex };
}

function isDigitNextToSymbol(lines: string[], digitPosition: Position): boolean {
  const isSymbolWithBoundaryCheck = (lines: string[], position: Position): boolean => {
    // this extra check is needed because we go out of bounds in some cases
    const char = lines[position.line]?.[position.column];
    if (char === undefined) {
      return false;
    }
    return isSymbol(char);
  };

  const { line, column } = digitPosition;

  if (
    isSymbolWithBoundaryCheck(lines, { line: line + 1, column: column }) ||
    isSymbolWithBoundaryCheck(lines, { line: line + 1, column: column + 1 }) ||
    isSymbolWithBoundaryCheck(lines, { line: line + 1, column: column - 1 }) ||
    isSymbolWithBoundaryCheck(lines, { line: line - 1, column: column }) ||
    isSymbolWithBoundaryCheck(lines, { line: line - 1, column: column + 1 }) ||
    isSymbolWithBoundaryCheck(lines, { line: line - 1, column: column - 1 }) ||
    isSymbolWithBoundaryCheck(lines, { line: line, column: column + 1 }) ||
    isSymbolWithBoundaryCheck(lines, { line: line, column: column - 1 })
  ) {
    return true;
  } else {
    return false;
  }
}

function isSymbol(char: string): boolean {
  return getCharType(char) === "symbol";
}
function isDigit(char: string): boolean {
  return getCharType(char) === "digit";
}

type Position = { line: number; column: number };
type CharType = "empty" | "digit" | "symbol";
function getCharType(char: string): CharType {
  if (char === ".") {
    return "empty";
  }
  if (!isNaN(parseInt(char))) {
    return "digit";
  }
  return "symbol"; // this assumes that anything other than a digit or a dot is a symbol
}
