export function warnsdorff(board:number[][]) {
  const numRows = board.length;
  const numCols = board[0].length;

  let x = 0;
  let y = 4;
  let moveNumber = 1;

  board[x][y] = moveNumber;

  while (moveNumber < numRows * numCols) {
    const validMoves = getValidMoves(x, y, board);

    if (validMoves.length === 0) {
      console.log("No solution found.");
      return;
    }

    const accessibilityScores = validMoves.map(move => getAccessibility(move.x, move.y, board));
    const minAccessibility = Math.min(...accessibilityScores);

    const nextMoveIndex = accessibilityScores.findIndex(score => score === minAccessibility);
    const nextMove = validMoves[nextMoveIndex];

    x = nextMove.x;
    y = nextMove.y;
    moveNumber++;
    board[x][y] = moveNumber;
  }

  return board;
}




function getValidMoves(x:number, y:number, board:number[][]) {
  const moves = [
    { dx: 1, dy: 2 },
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: -2 },
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: 2 }
  ];

  const validMoves = [];
  for (const move of moves) {
    const newX = x + move.dx;
    const newY = y + move.dy;
    if (isValidMove(newX, newY, board)) {
      validMoves.push({ x: newX, y: newY });
    }
  }

  return validMoves;
}

function getAccessibility(x:number, y:number, board:number[][]) {
  return getValidMoves(x, y, board).length;
}

function isValidMove(x: number, y: number, board: number[][]) {
  return x >= 0 && y >= 0 && x < board.length && y < board[0].length && board[x][y] === -1;
}