import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { warnsdorff } from './utils';

function App() {
  const [numRows, setNumRows] = useState<number>(5);
  const [numCols, setNumCols] = useState<number>(5);

  const initTablero = (rows: number, cols: number) => {
    return Array.from({ length: rows }, () => Array(cols).fill(-1));
  };
  const [tablero, setTablero] = useState<number[][]>(
    initTablero(numRows, numCols),
  );
  const [start, setStart] = useState(false);

  const position = { x: 0, y: 0 };

  const getColor = (row: number, column: number): 'white' | 'black' => {
    return (row + column) % 2 === 0 ? 'white' : 'black';
  };

  const handleClickFull = () => {
    try {
      const result = warnsdorff(tablero, position);
      if (result?.board) {
        setTablero(result.board);
      }
      setStart(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleClickOne = () => {
    try {
      const result = warnsdorff(tablero, position);
      if (result?.pathBoard) {
        setStart(true);

        const delay = 1000;
        let moveIndex = 0;

        const moveOneByOne = () => {
          if (moveIndex < result.pathBoard.length) {
            const { x, y } = result.pathBoard[moveIndex];
            setTablero((prevTablero) => {
              const newTablero = [...prevTablero];
              newTablero[x][y] = moveIndex;
              return newTablero;
            });
            moveIndex++;

            if (moveIndex < result.pathBoard.length) {
              setTimeout(moveOneByOne, delay);
            } else {
              setStart(true);
            }
          }
        };

        moveOneByOne();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleReset = () => {
    setNumRows(5);
    setNumCols(5);
    setTablero(initTablero(5, 5));
    setStart(false);
  };

  return (
    <>
      {start && <button onClick={handleReset}>Reiniciar</button>}
      {!start && <button onClick={handleClickFull}>Ver Todo</button>}
      {!start && <button onClick={handleClickOne}>Ejecutar Auto</button>}
      <table className="chessboard">
        <tbody>
          {tablero.map((row, indexRow) => {
            return (
              <tr key={'row' + uuidv4()}>
                {row.map((value, indexColumn) => {
                  return (
                    <td
                      key={'column' + uuidv4()}
                      className={getColor(indexRow, indexColumn)}
                    >
                      {value !== -1 ? value : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!start && (
        <div>
          <div>
            <label htmlFor="y">Columnas:</label>
            <input
              name="y"
              type="number"
              value={numCols}
              onChange={(value) => {
                const valueNumber = Number(value.target.value);
                setNumCols(valueNumber);
                setTablero(initTablero(numRows, valueNumber));
              }}
            />
          </div>
          <label htmlFor="x">Filas:</label>
          <input
            name="x"
            type="number"
            value={numRows}
            onChange={(value) => {
              const valueNumber = Number(value.target.value);
              setNumRows(valueNumber);
              setTablero(initTablero(valueNumber, numCols));
            }}
          />
        </div>
      )}
    </>
  );
}

export default App;
