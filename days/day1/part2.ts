import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const lines: string[] = input.split("\n");

const calibrationValues: number[] = lines.map((line) => {
  const allNumbersInLine = getAllNumbersInLine(line);
  if (allNumbersInLine.length < 1) {
    throw new Error("no numbers found in line");
  }
  const firstNumber = allNumbersInLine[0];
  const lastNumber = allNumbersInLine[allNumbersInLine.length - 1];
  return parseInt(firstNumber.toString() + lastNumber.toString());
});

const sumOfCalibrationValues = calibrationValues.reduce((acc, curr) => acc + curr, 0);

console.log(sumOfCalibrationValues);

console.log("done");

function getAllNumbersInLine(line: string): number[] {
  const allNumbersAsWords: { asString: string; numericValue: number }[] = [
    {
      asString: "one",
      numericValue: 1,
    },
    {
      asString: "two",
      numericValue: 2,
    },
    {
      asString: "three",
      numericValue: 3,
    },
    {
      asString: "four",
      numericValue: 4,
    },
    {
      asString: "five",
      numericValue: 5,
    },
    {
      asString: "six",
      numericValue: 6,
    },
    {
      asString: "seven",
      numericValue: 7,
    },
    {
      asString: "eight",
      numericValue: 8,
    },
    {
      asString: "nine",
      numericValue: 9,
    },
    {
      asString: "0",
      numericValue: 0,
    },
    {
      asString: "1",
      numericValue: 1,
    },
    {
      asString: "2",
      numericValue: 2,
    },
    {
      asString: "3",
      numericValue: 3,
    },
    {
      asString: "4",
      numericValue: 4,
    },
    {
      asString: "5",
      numericValue: 5,
    },
    {
      asString: "6",
      numericValue: 6,
    },
    {
      asString: "7",
      numericValue: 7,
    },
    {
      asString: "8",
      numericValue: 8,
    },
    {
      asString: "9",
      numericValue: 9,
    },
  ];

  const allNumbers: number[] = [];

  for (let i = 0; i < line.length; i++) {
    const numberFoundAtCurrentIndex = allNumbersAsWords.find(({ asString }) => {
      if (asString === line.substring(i, asString.length + i)) {
        return true;
      }
    });

    if (numberFoundAtCurrentIndex !== undefined) {
      allNumbers.push(numberFoundAtCurrentIndex.numericValue);
    }
  }

  return allNumbers;
}
