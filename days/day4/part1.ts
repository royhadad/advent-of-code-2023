import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const hailstones = parseInput(input);

const intersectionPoints: ({ x: number; y: number } | null)[] = [];

for (let i = 0; i < hailstones.length; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const hs1 = hailstones[i];
    const hs2 = hailstones[j];
    const intersectionPoint = findIntersectionPoint({
      px1: hs1.position.x,
      py1: hs1.position.y,
      vx1: hs1.velocity.x,
      vy1: hs1.velocity.y,
      px2: hs2.position.x,
      py2: hs2.position.y,
      vx2: hs2.velocity.x,
      vy2: hs2.velocity.y,
    });

    intersectionPoints.push(intersectionPoint);
  }
}

console.log(intersectionPoints);

console.log("done");

type Hailstone = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  velocity: {
    x: number;
    y: number;
    z: number;
  };
};

function parseInput(input: string): Hailstone[] {
  const hailstones: Hailstone[] = input.split("\n").map((line) => {
    const [positionString, velocityString] = line.split("@");
    const [px, py, pz] = positionString.trim().split(", ");
    const [vx, vy, vz] = velocityString.trim().split(", ");

    return {
      position: { x: parseInt(px), y: parseInt(py), z: parseInt(pz) },
      velocity: { x: parseInt(vx), y: parseInt(vy), z: parseInt(vz) },
    };
  });

  return hailstones;
}

// find intersections between hailstones' paths (no collision needed)
// test area 200000000000000 to 400000000000000 (x & y axis)
// 2 hailstones can only collide once (because they move in a straight line)
// disregard the z axis entirely
// simulation will most likely be too slow, so I'll use maths instead

function findIntersectionPoint(positionsAndVelocities: {
  px1: number;
  py1: number;
  vx1: number;
  vy1: number;
  px2: number;
  py2: number;
  vx2: number;
  vy2: number;
}): { x: number; y: number; isInThePastLine1: boolean; isInThePastLine2: boolean } | null {
  const { px1, py1, vx1, vy1, px2, py2, vx2, vy2 } = positionsAndVelocities;

  // the functions
  // const line1X = (t: number) => px1 + t * vx1;
  // const line1Y = (t: number) => py1 + t * vy1;

  // const line2X = (f: number) => px2 + f * vx2;
  // const line2Y = (f: number) => py2 + f * vy2;

  // the equations to solve, we need to find the intersection point
  // px1 + t * vx1 = px2 + f * vx2
  // py1 + t * vy1 = py2 + f * vy2

  // extract t from first equation
  // px1 + t * vx1 = px2 + f * vx2
  // t = (px2 + f * vx2 - px1)/(vx1)

  // substitute t in 2nd equation
  // py1 + t * vy1 = py2 + f * vy2
  // py1 + ((px2 + f * vx2 - px1)/(vx1)) * vy1 = py2 + f * vy2

  // solve for f
  // py1 + ((px2 + f * vx2 - px1)/(vx1)) * vy1 = py2 + f * vy2
  // f = (vx1 * (py2 - py1) - px2 + px1) / (vx2 - vx1 * vy2)

  // solve for t
  // t = (px2 + f * vx2 - px1)/(vx1)

  // find x and y
  // const line1XAtIntersection = line1X(t)
  // const line1YAtIntersection = line1Y(t)

  const slope1 = { numerator: vy1, denominator: vx1 };
  const slope2 = { numerator: vy2, denominator: vx2 };

  // Check if slopes are equal
  // to avoid floating point precision problems, we don't divide, but rather keep the numerator and denominator
  const areParallel = slope1.numerator * slope2.denominator === slope2.numerator * slope1.denominator;

  if (areParallel) {
    return null;
  }

  const f = (vx1 * (py2 - py1) - px2 + px1) / (vx2 - vx1 * vy2);
  const t = (px2 + f * vx2 - px1) / vx1;

  const line1XAtIntersection = px1 + t * vx1;
  const line1YAtIntersection = py1 + t * vy1;

  return {
    x: line1XAtIntersection,
    y: line1YAtIntersection,
    isInThePastLine1: t < 0,
    isInThePastLine2: f < 0,
  };
}
