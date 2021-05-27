import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.30 }) {
  //changed from useState(createBoard()) to callback below
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    console.log("making board!")
    let initialBoard = [];
    //create cols
    for (let y = 0; y < nrows; y++) {
      let row = [];
      //create row
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    //check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell === false));
  }

  //TODO add docstring
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);

      // return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  function showWinner() {
    if (hasWon()) {
      return (
        <div> You won! </div>
      )
    };
  }

  // make table board
  function generateBoardHTML() {
    return board.map((row, y) => {
      return <tr key={y}>{row.map((cell, x) => {
        return <Cell
          key={`${y}-${x}`}
          flipCellsAroundMe={evt => flipCellsAround(`${y}-${x}`)}
          isLit={cell} />
      })
      }</tr>
    });
  }


  return (
    <div className="Board">
      {showWinner() || <table><tbody>{generateBoardHTML()}</tbody></table>}
    </div>
  )
}

export default Board;
