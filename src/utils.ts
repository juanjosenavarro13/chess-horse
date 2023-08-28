import { Posicion } from "./tablero";


export function activarCasillaTablero(tablero: number[][], columna: number, fila: number, numero: number) {
  if (tablero[fila][columna] !== 0) return tablero;

  const editTablero = [...tablero];
  editTablero[fila][columna] = numero;
  return editTablero
}


export function getNewPosition(tablero: number[][], movimiento: number, actualPosicion: Posicion) {
  
  const posibleMoves = getPossibleMoves(tablero, actualPosicion)
  console.log(posibleMoves)
  const newPosition: Posicion = {
    fila: 2,
    columna: 5
  }

  return { newTablero: activarCasillaTablero(tablero, newPosition.columna, newPosition.fila, movimiento), posicion: newPosition }
}


function getPossibleMoves(tablero: number[][], posicion: Posicion) {
  console.log('posicion', posicion)
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