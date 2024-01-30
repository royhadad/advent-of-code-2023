import * as math from "mathjs";

export interface LinearEquation {
  coefficients: number[]; // Coefficients of the unknowns (n + 6)
  constant: number; // Constant on the right-hand side
}

interface Solution {
  unknowns: number[]; // The solution for the unknowns
}

// TODO fix this
// Error solving system of equations: RangeError: Matrix must be square (size: [300, 33])
export function solveSystemOfEquations(equations: LinearEquation[]): Solution | null {
  try {
    const coefficientsMatrix = equations.map((eq) => eq.coefficients);
    const constants = equations.map((eq) => [eq.constant]);

    // Use math.matrix to create a matrix from the coefficients array
    const augmentedMatrix = math.matrix(coefficientsMatrix);
    const augmentedConstants = math.matrix(constants);

    // Convert to array before calling lusolve
    const solutionArray = math.lusolve(augmentedMatrix, augmentedConstants);

    const results: number[] = [];
    solutionArray.forEach((x) => {
      results.push(x[0]);
    });
    return { unknowns: results };
  } catch (error) {
    console.error("Error solving system of equations:", error);
    return null;
  }
}
