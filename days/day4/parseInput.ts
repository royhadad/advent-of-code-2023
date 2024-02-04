export type Card = {
  id: number;
  winningNumbers: number[];
  numbers: number[];
};

export function parseInput(input: string): Card[] {
  const removeDuplicateSpaces = (str: string): string => {
    return str.replace(/\s+/g, " ");
  };

  const lines: string[] = input.split("\n");
  const cards = lines.map(removeDuplicateSpaces).map((line): Card => {
    const [idPart, numbersPart] = line.split(":").map((str) => str.trim());

    const [, idString] = idPart.split(" ");
    const id = parseInt(idString);

    const [winningNumbersString, numbersString] = numbersPart.split("|").map((str) => str.trim());
    const winningNumbers = winningNumbersString.split(" ").map((str) => parseInt(str));
    const numbers = numbersString.split(" ").map((str) => parseInt(str));

    return {
      id,
      winningNumbers,
      numbers,
    };
  });

  return cards;
}
