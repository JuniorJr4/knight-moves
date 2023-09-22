class Node {
    constructor(position, parent) {
      this.position = position;
      this.parent = parent;
    }
  }
  
  function isInsideBoard(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  
  function getValidMoves(x, y) {
    const moves = [
      [x + 1, y + 2], [x + 2, y + 1],
      [x + 1, y - 2], [x + 2, y - 1],
      [x - 1, y + 2], [x - 2, y + 1],
      [x - 1, y - 2], [x - 2, y - 1]
    ];
  
    return moves.filter(([newX, newY]) => isInsideBoard(newX, newY));
  }
  
  function knightMoves(start, end) {
    const queue = [];
    const visited = new Set();
    const path = [];
  
    const startNode = new Node(start, null);
    queue.push(startNode);
    visited.add(start.toString());
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
      const [x, y] = currentNode.position;
  
      if (x === end[0] && y === end[1]) {
        // Found the shortest path, backtrack to build the path
        let current = currentNode;
        while (current !== null) {
          path.unshift(current.position);
          current = current.parent;
        }
        return path;
      }
  
      const nextMoves = getValidMoves(x, y);
      for (const [newX, newY] of nextMoves) {
        const newPosition = [newX, newY];
        if (!visited.has(newPosition.toString())) {
          visited.add(newPosition.toString());
          const newNode = new Node(newPosition, currentNode);
          queue.push(newNode);
        }
      }
    }
  
    return null; // No valid path found
  }
  
  // Test cases
  console.log(knightMoves([0, 0], [1, 2])); // Output: [[0, 0], [1, 2]]
  console.log(knightMoves([0, 0], [3, 3])); // Output: [[0, 0], [1, 2], [3, 3]]
  console.log(knightMoves([3, 3], [0, 0])); // Output: [[3, 3], [1, 2], [0, 0]]
  