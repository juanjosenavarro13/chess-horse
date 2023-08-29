import { useEffect, useState } from 'react';
import './App.css';
import { warnsdorff } from './utils';

function App() {
    const numRows = 8;
    const numCols = 8;

    const initTablero = Array.from({ length: numRows }, () => Array(numCols).fill(-1));

    const [tablero, setTablero] = useState<number[][]>(initTablero);
    const [start, setStart] = useState(false);

    const position = { x: 0, y: 0 };

    const getColor = (row: number, column: number): 'white' | 'black' => {
        return (row + column) % 2 === 0 ? 'white' : 'black';
    };

    const handleClickFull = () => {
        const result = warnsdorff(tablero, position);
        if (result?.board) {
            setTablero(result.board);
        }
        setStart(true);
    };

    const handleClickOne = () => {
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
    };

    useEffect(() => {
        console.log('tablero', tablero);
    }, [tablero, start]);

    return (
        <>
            {!start && <button onClick={handleClickFull}>Ver Todo</button>}
            {!start && <button onClick={handleClickOne}>Ejecutar Auto</button>}
            <table className="chessboard">
                <tbody>
                    {tablero.map((row, indexRow) => {
                        return (
                            <tr key={'row' + indexRow}>
                                {row.map((value, indexColumn) => {
                                    return (
                                        <td key={'column' + indexColumn} className={getColor(indexRow, indexColumn)}>
                                            {value !== -1 ? value : ''}
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
