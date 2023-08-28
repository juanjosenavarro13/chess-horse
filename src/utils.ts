import { Posicion } from "./tablero";


export function printChessTable(tablero: number[][], fila: number, columna: number, numero: number) {
  if (tablero[fila][columna] !== 0) return tablero;

  const editTablero = [...tablero];
  editTablero[fila][columna] = numero;
  return editTablero
}



export function getPossibleMoves(tablero: number[][], posicion: Posicion) {
  const possibleMoves: Posicion[] = [
    {fila: posicion.fila -1,columna: posicion.columna -2},
    {fila: posicion.fila -2,columna: posicion.columna -1},
    {fila: posicion.fila +1,columna: posicion.columna -2},
    {fila: posicion.fila +2,columna: posicion.columna -1},
    {fila: posicion.fila -2,columna: posicion.columna +1},
    {fila: posicion.fila -1,columna: posicion.columna +2},
    {fila: posicion.fila +1,columna: posicion.columna +2},
    {fila: posicion.fila +2,columna: posicion.columna +1}
  ];

  const validMoves: Posicion[] = [];

  for (const move of possibleMoves) {
    const { fila, columna } = move;
    if (fila >= 0 && fila < tablero.length && columna >= 0 && columna < tablero[0].length) {
      validMoves.push(move);
    }
  }

  return validMoves;
}


export function getAllMoves(tablero: number[][], initialPosition: Posicion): Posicion[] {
  const allMoves: Posicion[] = [];
  const visited: Set<string> = new Set();

  const recursiveSearch = (currentPosition: Posicion) => {
    const key = `${currentPosition.fila}-${currentPosition.columna}`;
    if (visited.has(key)) {
      return;
    }
    visited.add(key);

    allMoves.push(currentPosition);

    const possibleMoves = getPossibleMoves(tablero, currentPosition);
    for (const move of possibleMoves) {
      recursiveSearch(move);
    }
  };

  recursiveSearch(initialPosition);

  return allMoves;
}