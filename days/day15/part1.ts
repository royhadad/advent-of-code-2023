import fs from "fs";

(() => {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

  console.log("started");

  const steps: string[] = input.split(",");

  const sumOfHashOfSteps = steps.map((step) => hashFunction(step)).reduce((acc, next) => acc + next);

  console.log("sumOfHashOfSteps:", sumOfHashOfSteps);

  console.log("done");

  function hashFunction(str: string): number {
    let currentValue = 0;

    for (let i = 0; i < str.length; i++) {
      const currentCharASCIIValue = str.charCodeAt(i);
      currentValue += currentCharASCIIValue;
      currentValue *= 17;
      currentValue %= 256;
    }

    return currentValue;
  }
})();
