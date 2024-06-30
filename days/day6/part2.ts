(() => {
  console.log("started");

  // the input is small, so we're better off parsing it manually

  type Race = {
    time: number;
    distance: number;
  };

  const numOfPossibleWins = findNumOfPossibleWins({
    time: 40817772,
    distance: 219101213651089,
  });

  console.log("numOfPossibleWins:", numOfPossibleWins);

  console.log("done");

  // using calculus solution for O(1)
  function findNumOfPossibleWins(race: Race): number {
    const { time, distance } = race;
    const x1 = time + Math.sqrt(time ** 2 - 4 * distance) / 2;
    const x2 = time - Math.sqrt(time ** 2 - 4 * distance) / 2;

    const start = Math.min(x1, x2);
    const startWinPossibilities = Math.ceil(start) === start ? start + 1 : Math.ceil(start);
    const end = Math.max(x1, x2);
    const endWinPossibilities = Math.floor(end) === end ? end - 1 : Math.floor(end);

    const winPossibilities = endWinPossibilities - startWinPossibilities + 1;
    return winPossibilities;
  }
})();
