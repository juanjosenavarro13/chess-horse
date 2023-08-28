import { useEffect, useState } from 'react';
import './App.css';
import { getAllMoves } from './utils';
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

  const getColor = (row: number, column: number): 'white' | 'black' => {
    return (row + column) % 2 === 0 ? 'white' : 'black';
  };

  const handleClick = () => {
    const allMoves = getAllMoves(tablero, { fila: 0, columna: 4 });
    executeMovesWithInterval(allMoves);
  };

  const executeMovesWithInterval = (allMoves: Posicion[]) => {
    allMoves.forEach((move, index) => {
      setTimeout(() => {
        setTablero((prevTablero) => {
          const newTablero = [...prevTablero];
          newTablero[move.fila][move.columna] = index + 1;
          return newTablero;
        });
      }, (index + 1) * 1000);
    });
  };

  useEffect(() => {
    console.log('render');
  }, [tablero]);

  return (
    <>
      <button onClick={handleClick}>Ejecutar</button>
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
