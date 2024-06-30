import fs from "fs";
import { hashFunction } from "./part1";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const steps: string[] = input.split(",");

type Lens = { label: string; focalLength: number };
type Box = Lens[];

const boxes: Box[] = new Array(256).fill(0).map(() => []);

printBoxes(boxes);

type Step = (
  | {
      type: "remove";
      boxIndex: number;
    }
  | {
      type: "insert";
      focalLength: number;
    }
) & {
  boxIndex: number;
  label: string;
};

steps
  .map((step): Step => {
    if (step.charAt(step.length - 1) === "-") {
      const [label] = step.split("-");
      return {
        type: "remove",
        boxIndex: hashFunction(label),
        label,
      };
    } else {
      const [label, focalLength] = step.split("=");
      return {
        type: "insert",
        focalLength: Number.parseInt(focalLength, 10),
        boxIndex: hashFunction(label),
        label,
      };
    }
  })
  .forEach((step, index) => {
    const currentBox = boxes[step.boxIndex];

    if (step.type === "remove") {
      const lensToRemoveIndex = currentBox.findIndex((lens) => lens.label === step.label);
      if (lensToRemoveIndex !== -1) {
        currentBox.splice(lensToRemoveIndex, 1);
      }
    } else {
      const lensToInsert = { label: step.label, focalLength: step.focalLength };
      const lensToReplaceIndex = currentBox.findIndex((lens) => lens.label === step.label);
      if (lensToReplaceIndex !== -1) {
        currentBox[lensToReplaceIndex] = lensToInsert;
      } else {
        currentBox.push(lensToInsert);
      }
    }
  });

printBoxes(boxes);

const sumOfFocusingPower = getSumOfFocusingPowers(boxes);

console.log("sumOfFocusingPower:", sumOfFocusingPower);

console.log("done");

function printBoxes(boxes: Box[]): void {
  boxes.forEach((box, index) => {
    if (box.length > 0) {
      console.log(
        `box ${index}:`,
        box.map((lens) => `${lens.label} ${lens.focalLength}`)
      );
    }
  });
}

function getSumOfFocusingPowers(boxes: Box[]): number {
  let sumOfFocusingPowers = 0;

  boxes.forEach((box, boxIndex) => {
    box.forEach((lens, lensIndex) => {
      sumOfFocusingPowers += (boxIndex + 1) * (lensIndex + 1) * lens.focalLength;
    });
  });

  return sumOfFocusingPowers;
}
