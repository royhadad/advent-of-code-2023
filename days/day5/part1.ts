import fs from "fs";
import { min, last } from "lodash";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const parsedInput = parseInput(input);

const { agriMaps, seeds } = parsedInput;

const seedsLocations = seeds.map((seed) => getSeedLocation(agriMaps, seed));

const closestSeedLocation = min(seedsLocations);

console.log(closestSeedLocation);

console.log("done");

function getSeedLocation(agriMaps: AgriMap[], seed: number): number {
  // seed is the first source value
  // location is the last destination value

  let currentValue = seed;
  agriMaps.forEach((agriMap) => {
    currentValue = getDestinationOfSource(agriMap, currentValue);
  });
  return currentValue;
}

function getDestinationOfSource(agriMap: AgriMap, source: number): number {
  for (const map of agriMap.maps) {
    if (source >= map.sourceRangeStart && source < map.sourceRangeStart + map.length) {
      return map.destinationRangeStart + source - map.sourceRangeStart;
    }
  }
  // if no value mapped for this key, the value is equal to the key itself
  return source;
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

function parseInput(input: string): { agriMaps: AgriMap[]; seeds: number[] } {
  const lines: string[] = input.split("\n");

  const seeds: number[] = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((str) => parseInt(str));

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
    seeds,
    agriMaps,
  };
}
