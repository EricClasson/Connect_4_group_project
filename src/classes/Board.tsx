import WinCheck from './WinCheck.js';
import MakeMoveCheck from './MakeMoveCheck.js';
import { Fragment } from 'react';

export default class Board {
  matrix: string[][];
  currentPlayer: string;
  winCheck: WinCheck;
  makeMoveCheck: MakeMoveCheck;
  stateUpdater: Function;
  winner: boolean | string;
  isDraw: boolean;
  gameOver: boolean | string;

  constructor(stateUpdater: Function) {
    this.stateUpdater = stateUpdater;
    this.matrix = [...new Array(6)].map(() => [...new Array(7)].map(() => ' '));
    this.currentPlayer = 'Red';
    this.winCheck = new WinCheck(this);
    this.makeMoveCheck = new MakeMoveCheck(this);
    this.winner = false;
    this.isDraw = false;
    this.gameOver = false;
  }

  render() {
    return (
      <div className="board">
        {this.matrix.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`column ${column} ${column === ' ' ? '' : column === 'Red' ? 'red' : 'yellow'}`}
                onClick={() => this.makeMove(columnIndex)}
              ></div>
            ))}
          </Fragment>
        ))}
      </div>
    );
  }

  makeMove(column: number): boolean {
    if (this.gameOver) return false;
    this.stateUpdater();
    if (this.makeMoveCheck.makeMoveCheck(column)) {
      this.winner = this.winCheck.checkForWin();
      this.isDraw = this.draw();
      this.gameOver = this.winner || this.isDraw;
      this.currentPlayer = this.currentPlayer === 'Red' ? 'Yellow' : 'Red';
      return true;
    }
    return false;
  }

  draw(): boolean {
    return this.matrix[0].every((cell) => cell !== ' ');
  }
}
