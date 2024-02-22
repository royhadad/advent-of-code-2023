// find all solutions to the equation a^3 + b^3 = c^3 + d^3
// where a, b, c, d are integers between 1 and 1000
// without duplicates
// from crack the coding interview

function findAllSolutionsToEquation(): Solution[] {
  const solutions: Solution[] = [];
  const LIMIT = 1000;

  const possibleSums = new Map<
    number,
    {
      a: number;
      b: number;
    }[]
  >();
  for (let a = 1; a < LIMIT; a++) {
    for (let b = a; b < LIMIT; b++) {
      const currentSum = a ** 3 + b ** 3;
      const currentArr = possibleSums.get(currentSum);
      if (currentArr === undefined) {
        possibleSums.set(currentSum, [
          {
            a,
            b,
          },
        ]);
      } else {
        currentArr.push({
          a,
          b,
        });
      }
    }
  }

  possibleSums.forEach((exponents, sum) => {
    exponents.forEach((exponent1, index) => {
      exponents.slice(index + 1).forEach((exponent2) => {
        const a = exponent1.a;
        const b = exponent1.b;
        const c = exponent2.a;
        const d = exponent2.b;

        if ((a === c && b === d) || a === d || b === c) {
          return;
        }
        solutions.push({
          a,
          b,
          c,
          d,
        });
      });
    });
  });
  return solutions;
}

type Solution = {
  a: number;
  b: number;
  c: number;
  d: number;
};

function checkSolution(solution: number[]): boolean {
  const [a, b, c, d] = solution;
  return a ** 3 + b ** 3 === c ** 3 + d ** 3;
}

const solutions = findAllSolutionsToEquation();
console.log(solutions);
console.log(solutions.length);

const areAllCorrect = solutions.every((solution) => checkSolution(Object.values(solution)));
console.log(areAllCorrect);
