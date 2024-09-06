import WinCheck from './WinCheck.js';
import MakeMoveCheck from './MakeMoveCheck.js';
import { Fragment } from 'react';
import PlayerClass from './Player.js';

export default class Board {
  matrix: string[][];
  currentPlayer: string;
  winCheck: WinCheck;
  makeMoveCheck: MakeMoveCheck;
  stateUpdater: Function;
  winner: boolean | string;
  isDraw: boolean;
  gameOver: boolean | string;
  moveCounterRed: number;
  moveCounterYellow: number;

  constructor(stateUpdater: Function) {
    this.stateUpdater = stateUpdater;
    this.matrix = [...new Array(6)].map(() => [...new Array(7)].map(() => ' '));
    this.currentPlayer = 'Red';
    this.winCheck = new WinCheck(this);
    this.makeMoveCheck = new MakeMoveCheck(this);
    this.winner = false;
    this.isDraw = false;
    this.gameOver = false;
    this.moveCounterRed = 1;
    this.moveCounterYellow = 1;
  }

  resetBoard() {
    this.matrix = [...new Array(6)].map(() => [...new Array(7)].map(() => ' '));
    this.currentPlayer = 'Red';
    this.winner = false;
    this.isDraw = false;
    this.gameOver = false;
    this.stateUpdater();
  }

  render(playerRed: PlayerClass | null, playerYellow: PlayerClass | null) {
    return (
      <div className="board-container">
        <div
          className={`player-corner top-left ${
            this.currentPlayer === 'Red' ? 'highlight-red' : ''
          }`}
        >
          {playerRed?.name}
        </div>
        <div
          className={`player-corner top-right ${
            this.currentPlayer === 'Yellow' ? 'highlight-yellow' : ''
          }`}
        >
          {playerYellow?.name}
        </div>
        <div className="board">
          {this.matrix.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {row.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`column ${column.toLowerCase()}`}
                  onClick={() => this.makeMove(columnIndex)}
                ></div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  makeMove(column: number): boolean {
    if (this.gameOver) return false;
    this.stateUpdater();
    if (this.makeMoveCheck.makeMoveCheck(column)) {
      if (this.currentPlayer === 'Red') {
        this.moveCounterRed++;
      } else {
        this.moveCounterYellow++;
      }
      this.winner = this.winCheck.checkForWin(this.currentPlayer);
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
