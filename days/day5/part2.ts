import fs from "fs";
import { min, last } from "lodash";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const parsedInput = parseInput(input);

const { agriMaps, seedsRanges } = parsedInput;

let smallestDestinationWithCorrespondingSeed: undefined | number = undefined;

for (let destinationToCheck = 0; destinationToCheck < 100000000; destinationToCheck++) {
  const seed = getSeedMatchingLocation(agriMaps, destinationToCheck);
  if (isSeedInSeedsRanges(seedsRanges, seed)) {
    smallestDestinationWithCorrespondingSeed = destinationToCheck;
    break;
  }
}

console.log(smallestDestinationWithCorrespondingSeed);

console.log("done");

function isSeedInSeedsRanges(seedsRanges: SeedsRange[], seed: number): boolean {
  for (const seedsRange of seedsRanges) {
    if (seed >= seedsRange.start && seed < seedsRange.start + seedsRange.length) {
      return true;
    }
  }
  return false;
}

function getSeedMatchingLocation(agriMaps: AgriMap[], destination: number): number {
  // seed is the first source value
  // location is the last destination value

  let currentValue = destination;
  agriMaps.reverse().forEach((agriMap) => {
    currentValue = getSourceByDestination(agriMap, currentValue);
  });
  return currentValue;
}

function getSourceByDestination(agriMap: AgriMap, destination: number): number {
  for (const map of agriMap.maps) {
    if (destination >= map.destinationRangeStart && destination < map.destinationRangeStart + map.length) {
      return map.sourceRangeStart + destination - map.destinationRangeStart;
    }
  }
  // if no source is mapped for this destination, the source is equal to the destination itself
  return destination;
}

type ConversionMap = {
  sourceRangeStart: number;
  destinationRangeStart: number;
  length: number;
};

type AgriMap = {
  name: string;
  maps: ConversionMap[];
};

type SeedsRange = { start: number; length: number };

function parseInput(input: string): { agriMaps: AgriMap[]; seedsRanges: SeedsRange[] } {
  const lines: string[] = input.split("\n");

  const seedsRawNumbers: number[] = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => parseInt(str));

  const seedsRanges: SeedsRange[] = [];
  for (let i = 0; i < seedsRawNumbers.length; i += 2) {
    seedsRanges.push({ start: seedsRawNumbers[i], length: seedsRawNumbers[i + 1] });
  }

  const agriMaps: AgriMap[] = [];

  lines.forEach((line, index) => {
    if (line === "" || index === 0) {
      return;
    }
    if (line.endsWith(":")) {
      agriMaps.push({ name: line, maps: [] });
      return;
    }

    const [destinationRangeStart, sourceRangeStart, length] = line.split(" ").map((str) => parseInt(str));
    const lastAgriMapInArray = last(agriMaps);
    if (lastAgriMapInArray === undefined) {
      throw new Error("error parsing input: lastAgriMapInArray is undefined, this should never happen");
    }
    lastAgriMapInArray.maps.push({ sourceRangeStart, destinationRangeStart, length });
  });

  return {
    seedsRanges,
    agriMaps,
  };
}
