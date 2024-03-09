const board = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
// console.log(isValidSudoku(board));

export function isValidSudoku(
  board: string[][]
): { isValid: false; groupOfPositionsWithViolation: Position[] } | { isValid: true } {
  const allPositionArraysToCheck: Position[][] = [];

  // check rows
  for (let row = 0; row < board.length; row++) {
    allPositionArraysToCheck.push(createPositionsOfAllCombinations([row], [0, 1, 2, 3, 4, 5, 6, 7, 8]));
  }

  // check columns
  for (let column = 0; column < board[0].length; column++) {
    allPositionArraysToCheck.push(createPositionsOfAllCombinations([0, 1, 2, 3, 4, 5, 6, 7, 8], [column]));
  }

  // check boxes
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([0, 1, 2], [0, 1, 2]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([3, 4, 5], [0, 1, 2]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([6, 7, 8], [0, 1, 2]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([0, 1, 2], [3, 4, 5]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([3, 4, 5], [3, 4, 5]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([6, 7, 8], [3, 4, 5]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([0, 1, 2], [6, 7, 8]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([3, 4, 5], [6, 7, 8]));
  allPositionArraysToCheck.push(createPositionsOfAllCombinations([6, 7, 8], [6, 7, 8]));

  for (const positionsArrayToCheck of allPositionArraysToCheck) {
    if (doNumbersRepeat(board, positionsArrayToCheck)) {
      return { isValid: false, groupOfPositionsWithViolation: positionsArrayToCheck };
    }
  }
  return { isValid: true };
}

export function createPositionsOfAllCombinations(rows: number[], columns: number[]): Position[] {
  const combinationPositions: Position[] = [];
  rows.forEach((row) => {
    columns.forEach((column) => {
      combinationPositions.push({
        row,
        column,
      });
    });
  });
  return combinationPositions;
}

export type Position = { row: number; column: number };
function doNumbersRepeat(board: string[][], positions: Position[]): boolean {
  const usedNumbers = new Set<number>(); // 1-9

  for (const position of positions) {
    const current = board[position.row][position.column];
    if (!isArrayItemEmpty(current)) {
      const currentNumber = convertArrayItemToNumber(current);
      if (usedNumbers.has(currentNumber)) {
        return true;
      } else {
        usedNumbers.add(currentNumber);
      }
    }
  }

  return false;
}

function isArrayItemEmpty(arrayItem: string): boolean {
  return arrayItem === ".";
}
function convertArrayItemToNumber(arrayItem: string): number {
  if (arrayItem === ".") {
    throw new Error("item is empty, did you forget to check beforehand?");
  }
  return Number.parseInt(arrayItem);
}
