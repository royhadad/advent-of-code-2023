export type Game = {
  id: number;
  rounds: { red: number; green: number; blue: number }[];
};
export type Color = "red" | "blue" | "green";

function stringToColor(color: string): Color {
  if (color !== "red" && color !== "blue" && color !== "green") {
    throw new Error("failed to convert string to color, invalid color");
  }
  return color;
}

export function parseInput(input: string): Game[] {
  const games: string[] = input.split("\n");

  return games.map((game) => {
    const indexOfColon = game.indexOf(":");
    const rounds = game.substring(indexOfColon + 1).split("; ");

    return {
      id: parseInt(game.substring(5, indexOfColon)),
      rounds: rounds.map((round) => {
        const roundAsArray = round
          .trim()
          .split(", ")
          .map((r) => {
            const [amount, color] = r.split(" ");
            return { amount: parseInt(amount), color: stringToColor(color) };
          });

        const roundParsed = { red: 0, blue: 0, green: 0 };

        roundAsArray.forEach((setOfBalls) => {
          roundParsed[setOfBalls.color] = setOfBalls.amount;
        });

        return roundParsed;
      }),
    };
  });
}
