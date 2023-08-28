import { useEffect, useState } from 'react';
import './App.css';
import { getNewPosition } from './utils';
import { Posicion } from './tablero';

function App() {
  const initTablero = [
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const [tablero, setTablero] = useState<number[][]>(initTablero);
  const [movimientos, setMovimientos] = useState<number>(1);
  const [actualPosition, setActualPosition] = useState<Posicion>({ columna: 4, fila: 0 });

  const getColor = (row: number, column: number): 'white' | 'black' => {
    return (row + column) % 2 === 0 ? 'white' : 'black';
  };

  const handleClick = () => {
    const actualMovimiento = movimientos + 1;
    const { newTablero, posicion: nuevaPosicion } = getNewPosition(tablero, actualMovimiento, actualPosition);
    setActualPosition(nuevaPosicion);
    setMovimientos(actualMovimiento);
    setTablero(newTablero);
  };

  useEffect(() => {
    console.log('render');
  }, [tablero, movimientos]);

  return (
    <>
      <button onClick={handleClick}>MOVIMIENTOS: {movimientos}</button>
      <table className='chessboard'>
        <tbody>
          {tablero.map((row, indexRow) => {
            return (
              <tr key={'row' + indexRow}>
                {row.map((value, indexColumn) => {
                  return (
                    <td key={'column' + indexColumn} className={getColor(indexRow, indexColumn)}>
                      {value !== 0 ? value : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
