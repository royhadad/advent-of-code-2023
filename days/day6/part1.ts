(() => {
  console.log("started");

  // the input is small, so we're better off parsing it manually

  type Race = {
    time: number;
    distance: number;
  };

  const races: Race[] = [
    {
      time: 40,
      distance: 219,
    },
    {
      time: 81,
      distance: 1012,
    },
    {
      time: 77,
      distance: 1365,
    },
    {
      time: 72,
      distance: 1089,
    },
  ];

  const racesNumOfPossibleWins = races.map(findNumOfPossibleWins);

  const multipleOfPossibleWins = racesNumOfPossibleWins.reduce((acc, next) => acc * next);

  console.log("multipleOfPossibleWins:", multipleOfPossibleWins);

  console.log("done");

  function findNumOfPossibleWins(race: Race): number {
    let numberOfPossibleWins = 0;
    for (let chargingTime = 0; chargingTime <= race.time; chargingTime++) {
      const distanceTravelled = findDistanceTravelled(race.time, chargingTime);
      if (distanceTravelled > race.distance) {
        numberOfPossibleWins++;
      }
    }
    return numberOfPossibleWins;
  }

  function findDistanceTravelled(totalTime: number, chargingTime: number): number {
    const speed = chargingTime;
    const timeLeft = totalTime - chargingTime;
    const distance = timeLeft * speed;
    return distance;
  }
})();
