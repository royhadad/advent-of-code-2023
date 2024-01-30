import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const hailstones = parseInput(input);

const intersectionPoints: IntersectionPoint[] = [];

forEachPairOfHailstones(hailstones, (hs1, hs2) => {
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
});

const TEST_AREA = {
  MIN: 200000000000000,
  MAX: 400000000000000,
};

const validIntersectionPoints = intersectionPoints.filter(
  (intersectionPoint) =>
    intersectionPoint !== null && // it exists (not parallel lines)
    !intersectionPoint.isInThePastLine1 && // it's not in the past
    !intersectionPoint.isInThePastLine2 &&
    intersectionPoint.x >= TEST_AREA.MIN && // it's inside the test area
    intersectionPoint.x <= TEST_AREA.MAX &&
    intersectionPoint.y >= TEST_AREA.MIN &&
    intersectionPoint.y <= TEST_AREA.MAX
);

console.log("total number of valid intersection points:", validIntersectionPoints.length);

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

function forEachPairOfHailstones(hailstones: Hailstone[], func: (hs1: Hailstone, hs2: Hailstone) => void): void {
  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const hs1 = hailstones[i];
      const hs2 = hailstones[j];
      func(hs1, hs2);
    }
  }
}

// find intersections between hailstones' paths (no collision needed)
// test area 200000000000000 to 400000000000000 (x & y axis)
// 2 hailstones can only collide once (because they move in a straight line)
// disregard the z axis entirely
// simulation will most likely be too slow, so I'll use maths instead

type IntersectionPoint = { x: number; y: number; isInThePastLine1: boolean; isInThePastLine2: boolean } | null;

function findIntersectionPoint(positionsAndVelocities: {
  px1: number;
  py1: number;
  vx1: number;
  vy1: number;
  px2: number;
  py2: number;
  vx2: number;
  vy2: number;
}): IntersectionPoint {
  const { px1, py1, vx1, vy1, px2, py2, vx2, vy2 } = positionsAndVelocities;

  if (vx1 === 0 || vx2 === 0) {
    throw new Error("unexpected vx1 or vx2 are equal to zero, case not implemented");
  }

  // the slopes are vy1/vx1 and vy2/vx2, so to check if they are equal (without getting floating point inaccuracy issues) we do this:
  if (vy1 * vx2 === vy2 * vx1) {
    return null; // slopes are equal, no intersection point
  }

  // equations of the form y=mx+b
  // y1(x:number) => (vy1/vx1)*(x-px1)+py1
  // y2(x:number) => (vy2/vx2)*(x-px2)+py2

  // set y to be the same and find x of intersection point
  // (vy1/vx1)*(x-px1)+py1 = (vy2/vx2)*(x-px2)+py2
  // solve for x
  const x = (vy1 * vx2 * px1 - vx1 * vx2 * py1 - vy2 * vx1 * px2 + vx1 * vx2 * py2) / (vy1 * vx2 - vy2 * vx1);
  // insert x back to the first equation to find y of intersection point
  const y = (vy1 / vx1) * (x - px1) + py1;

  // now to check the time of intersection, using those equations to describe x in relation to time (t)
  // const line1X = px1 + t1 * vx1;
  // const line2X = px2 + t2 * vx2;

  // solving the first equation for t1
  // x = px1 + t1 * vx1
  // t1 = (x - px1)/vx1

  // solving the second equation for t2
  // x = px2 + t2 * vx2
  // t2 = (x-px2)/vx2

  const line1Time = (x - px1) / vx1;
  const line2Time = (x - px2) / vx2;

  return {
    x,
    y,
    isInThePastLine1: line1Time < 0,
    isInThePastLine2: line2Time < 0,
  };
}
