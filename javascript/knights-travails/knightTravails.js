const BOARD_MIN = 0;
const BOARD_MAX = 7;

const MOVES = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function inBounds([x, y]) {
  return x >= BOARD_MIN && x <= BOARD_MAX && y >= BOARD_MIN && y <= BOARD_MAX;
}

function serialize([x, y]) {
  return `${x},${y}`;
}

function knightMoves(start, end) {
  if (!inBounds(start) || !inBounds(end)) {
    throw new Error('Both start and end must be valid board coordinates between 0 and 7.');
  }

  if (serialize(start) === serialize(end)) {
    return [start];
  }

  const queue = [[start, [start]]];
  const visited = new Set([serialize(start)]);

  while (queue.length) {
    const [position, path] = queue.shift();

    for (const [dx, dy] of MOVES) {
      const next = [position[0] + dx, position[1] + dy];
      const key = serialize(next);

      if (!inBounds(next) || visited.has(key)) {
        continue;
      }

      const nextPath = [...path, next];

      if (key === serialize(end)) {
        return nextPath;
      }

      visited.add(key);
      queue.push([next, nextPath]);
    }
  }

  return [];
}

function printKnightPath(start, end) {
  const path = knightMoves(start, end);
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((step) => console.log(step));
  return path;
}

module.exports = { knightMoves, printKnightPath };
