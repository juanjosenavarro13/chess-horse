import { type PathBoard, type Result } from './utils.d';

export function warnsdorff(
  board: number[][],
  initialPosition: { y: number; x: number },
): Result {
  const numRows = board.length;
  const numCols = board[0].length;

  const copiedBoard = board.map((row) => [...row]);

  let x = initialPosition.x;
  let y = initialPosition.y;
  let writeNumber = 1;

  copiedBoard[x][y] = writeNumber;
  const pathBoard = [{ x, y }];

  while (writeNumber < numRows * numCols) {
    const validMoves = getValidMoves(x, y, copiedBoard);

    if (validMoves.length === 0) {
      throw new Error('no tiene solucion');
    }

    const accessibilityScores = validMoves.map((move): number =>
      getAccessibility(move.x, move.y, copiedBoard),
    );
    const minAccessibility = Math.min(...accessibilityScores);

    const nextMoveIndex = accessibilityScores.findIndex(
      (score) => score === minAccessibility,
    );
    const nextMove = validMoves[nextMoveIndex];

    x = nextMove.x;
    y = nextMove.y;
    writeNumber++;
    copiedBoard[x][y] = writeNumber;
    pathBoard.push({ x, y });
  }

  return { board: copiedBoard, pathBoard };
}

function getValidMoves(x: number, y: number, board: number[][]): PathBoard[] {
  const moves = [
    { dx: 1, dy: 2 },
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: -2 },
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: 2 },
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

function getAccessibility(x: number, y: number, board: number[][]): number {
  return getValidMoves(x, y, board).length;
}

function isValidMove(x: number, y: number, board: number[][]): boolean {
  return (
    x >= 0 &&
    y >= 0 &&
    x < board.length &&
    y < board[0].length &&
    board[x][y] === -1
  );
}
