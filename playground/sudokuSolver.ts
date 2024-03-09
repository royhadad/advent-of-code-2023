import { cloneDeep } from "lodash";
import { createPositionsOfAllCombinations, isValidSudoku, Position } from "./isValidSudoku";

const allNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const EMPTY = ".";

main();

function main(): void {
  const board: Board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  const easyBoard: Board = [
    ["1", ".", ".", ".", "8", ".", ".", "2", "7"],
    ["4", ".", ".", "3", ".", ".", "6", ".", "."],
    ["7", ".", ".", ".", ".", "2", ".", "4", "."],
    [".", ".", ".", "5", ".", ".", ".", "1", "."],
    ["8", ".", ".", "4", ".", "1", ".", ".", "9"],
    [".", "9", ".", ".", ".", "6", ".", ".", "."],
    [".", "2", ".", "8", ".", ".", ".", ".", "1"],
    [".", ".", "6", ".", ".", "7", ".", ".", "8"],
    ["3", "8", ".", ".", "4", ".", ".", ".", "5"],
  ];
  const solvedSudoku = solveSudoku(easyBoard);
  console.log("before:");
  printSudoKu(easyBoard);
  console.log("\nafter:");
  printSudoKu(solvedSudoku);
  console.log("\nis valid sudoku result:", isValidSudoku(solvedSudoku));
}

function printSudoKu(board: Board): void {
  board.forEach((line) => {
    console.log(JSON.stringify(line));
  });
}

type Board = string[][];

function solveSudoku(inputBoard: Board): Board {
  const board = cloneDeep(inputBoard);

  const { numberOfSquaresFilled } = fillAllTrivialSquaresUntilExhaustion(board);
  console.log("\nsquares filled:", numberOfSquaresFilled, "\n");
  return board;
}

// careful: mutates the input board
function fillAllTrivialSquaresUntilExhaustion(board: Board): { numberOfSquaresFilled: number } {
  let numberOfSquaresFilled = 0;

  let squaresFilled = 0;
  do {
    squaresFilled = fillAllTrivialSquares(board).numberOfSquaresFilled;
    numberOfSquaresFilled += squaresFilled;
  } while (squaresFilled > 0);

  return { numberOfSquaresFilled };
}

// careful: mutates the input board
function fillAllTrivialSquares(board: Board): { numberOfSquaresFilled: number } {
  let numberOfSquaresFilled = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === EMPTY) {
        const options = getNumbersThatCouldGoHere(row, col, board);
        if (options.length === 1) {
          board[row][col] = options[0];
        }
      }
    }
  }

  return { numberOfSquaresFilled: numberOfSquaresFilled };
}

function getNumbersThatCouldGoHere(row: number, col: number, board: Board): string[] {
  const positions: Position[] = [
    ...createPositionsOfAllCombinations([row], [0, 1, 2, 3, 4, 5, 6, 7, 8]),
    ...createPositionsOfAllCombinations([0, 1, 2, 3, 4, 5, 6, 7, 8], [col]),
  ];

  if (row >= 0 && row <= 2 && col >= 0 && col <= 2) {
    positions.push(...createPositionsOfAllCombinations([0, 1, 2], [0, 1, 2]));
  }
  if (row >= 3 && row <= 5 && col >= 0 && col <= 2) {
    positions.push(...createPositionsOfAllCombinations([3, 4, 5], [0, 1, 2]));
  }
  if (row >= 6 && row <= 8 && col >= 0 && col <= 2) {
    positions.push(...createPositionsOfAllCombinations([6, 7, 8], [0, 1, 2]));
  }
  if (row >= 0 && row <= 2 && col >= 3 && col <= 5) {
    positions.push(...createPositionsOfAllCombinations([0, 1, 2], [3, 4, 5]));
  }
  if (row >= 3 && row <= 5 && col >= 3 && col <= 5) {
    positions.push(...createPositionsOfAllCombinations([3, 4, 5], [3, 4, 5]));
  }
  if (row >= 6 && row <= 8 && col >= 3 && col <= 5) {
    positions.push(...createPositionsOfAllCombinations([6, 7, 8], [3, 4, 5]));
  }
  if (row >= 0 && row <= 2 && col >= 6 && col <= 8) {
    positions.push(...createPositionsOfAllCombinations([0, 1, 2], [6, 7, 8]));
  }
  if (row >= 3 && row <= 5 && col >= 6 && col <= 8) {
    positions.push(...createPositionsOfAllCombinations([3, 4, 5], [6, 7, 8]));
  }
  if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
    positions.push(...createPositionsOfAllCombinations([6, 7, 8], [6, 7, 8]));
  }

  return getOptionsThatDontExistInInput(board, positions);
}

function getOptionsThatDontExistInInput(board: Board, positions: Position[]): string[] {
  const options: string[] = [];
  allNumbers.forEach((num) => {
    if (positions.find((position) => board[position.row][position.column] === num) === undefined) {
      options.push(num);
    }
  });
  return options;
}
