import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8").trim();

console.log("started");

const hailstones = parseInput(input);

const intersectionPoints: ({ x: number; y: number } | null)[] = [];

for (let i = 0; i < hailstones.length; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const hs1 = hailstones[i];
    const hs2 = hailstones[j];
    intersectionPoints.push(
      findIntersectionPoint({
        px1: hs1.position.x,
        py1: hs1.position.y,
        vx1: hs1.velocity.x,
        vy1: hs1.velocity.y,
        px2: hs2.position.x,
        py2: hs2.position.y,
        vx2: hs2.velocity.x,
        vy2: hs2.velocity.y,
      })
    );
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

function getHailstonesInOneNanosecond(hailstones: Hailstone[]): Hailstone[] {
  return hailstones.map((hailstone) => {
    return {
      position: {
        x: hailstone.position.x + hailstone.velocity.x,
        y: hailstone.position.y + hailstone.velocity.y,
        z: hailstone.position.z + hailstone.velocity.z,
      },
      velocity: hailstone.velocity,
    };
  });
}

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

function findIntersectionPoint(positionsAndVelocities: {
  px1: number;
  py1: number;
  vx1: number;
  vy1: number;
  px2: number;
  py2: number;
  vx2: number;
  vy2: number;
}): { x: number; y: number } | null {
  const { px1, py1, vx1, vy1, px2, py2, vx2, vy2 } = positionsAndVelocities;

  if (vy1 * vx2 === vy1 * vx1) {
    // no intersection point because they have the same angle of trajectory
    return null;
  }

  // const line1X = (t1: number) => px1+vx1*t1
  // const line2X = (t2: number) => px2+vx2*t2
  //
  // const line1Y = (t1: number) => py1+vy1*t1
  // const line2Y = (t2: number) => py1+vy1*t2
  //

  // intersection time
  const t2 = (vy1 * px1 - vy1 * px2) / (vy1 * vx2 - vy1 * vx1);

  // intersection point
  return { x: px1 + vx1 * t2, y: py1 + vy1 * t2 };
  // px1+vx1*t1 = px2+vx2*t2

  // extract t1
  // t1 = (px2+vx2*t2 - px1)/vx1

  // py1+vy1*t1 = py1+vy1*t2

  // py1+vy1*((px2+vx2*t2 - px1)/vx1) = py1+vy1*t2

  // py1+vy1*((px2+vx2*t2 - px1)/vx1) = py1+vy1*t2

  // py1 + (vy1*(px2+vx2*t2 - px1))/(vy1*vx1) = py1+vy1*t2

  // py1 + (vy1*(px2+vx2*t2 - px1))/(vy1*vx1) = py1+vy1*t2

  //

  const line2 = (x) => vy1 * (x - px1) + py1;
  const line3 = (x) => vy2 * (x - px2) + py2;

  const x = (py2 + vy1 * px1 - py1 - px2 * vy2) / (vy1 - vy2);
  const y = vy1 * (x - px1) + py1;

  return { x, y };
}

// find intersections between hailstones' paths (no collision needed)
// test area 200000000000000 to 400000000000000 (x & y axis)
// 2 hailstones can only collide once (this assumes that no 2 hailstones have the same velocity and position, we can check that later)
// disregard the z axis
// simulation will most likely be too slow, so I'll use maths instead

// 5, 2 @ +3, +4 ----- 2, 3 @ +1, +0.5

// y = 2/5 + (4/3)*x
// x=1 => y=2

// Hailstone A: 19, 13, 30 @ -2, 1, -2
// Hailstone B: 18, 19, 22 @ -1, -1, -2
// Hailstones' paths will cross inside the test area (at x=14.333, y=15.333).
// px1 + vx1 * t = px2 + vx2 * t
// py1 + vy1 * t = py2 + vy2 * t

// px1 + -2 *t = px2 + -1*t
// 1t = px2-px1
// px2 = 1t+px1

// py1 + 1t = py2 + -1t
// py1 -py2 = -2t

// -------

// x1(t) = px1 + vx1*t
// y1(t) = py1 + vy1*t

// x1(t) = px1 + -2*t
// y1(t) = py1 + 1*t
//
