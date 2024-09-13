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
  winningMarker: [number, number][];

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
    this.winningMarker = [];
  }

  resetBoard() {
    this.matrix = [...new Array(6)].map(() => [...new Array(7)].map(() => ' '));
    this.currentPlayer = 'Red';
    this.winner = false;
    this.isDraw = false;
    this.gameOver = false;
    this.stateUpdater();
    this.winningMarker = [];
  }

  render(playerRed: PlayerClass | null, playerYellow: PlayerClass | null) {
    return (
      <div className="board-container">
        <div className="board-nav-display-name">
          <div
            className={`corner-display ${
              this.currentPlayer === 'Red' ? 'highlight-red' : ''
            }`}
          >
            <h3>Your turn:</h3>
            <h3>{playerRed?.name}</h3>
            <div className={'player-corner player-red'}>
              <img src={playerRed?.image} />
            </div>
          </div>
          <div
            className={`corner-display ${
              this.currentPlayer === 'Yellow' ? 'highlight-yellow' : ''
            } `}
          >
            <h3>Your turn:</h3>
            <h3>{playerYellow?.name}</h3>
            <div className={`player-corner player-yellow `}>
              <img src={playerYellow?.image} />
            </div>
          </div>
        </div>

        <div
          className={`board ${
            this.currentPlayer === playerRed!.color && playerRed!.isAI
              ? 'inactive'
              : ''
          } ${
            this.currentPlayer === playerYellow!.color && playerYellow!.isAI
              ? 'inactive'
              : ''
          }`}
        >
          {this.matrix.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              {row.map((column, columnIndex) => {
                const isWinningMarker = this.winningMarker.some(
                  ([r, c]) => r === rowIndex && c === columnIndex
                );
                const isColumnFull = this.matrix[0][columnIndex] !== ' ';
                return (
                  <div className="board-cell" key={columnIndex}>
                    <div
                      key={columnIndex}
                      className={`column ${isColumnFull ? 'not-allowed' : ''}`}
                      onClick={() =>
                        !isColumnFull && this.makeMove(columnIndex)
                      }
                    ></div>
                    {column && (
                      <div
                        style={{ '--row': rowIndex + 1 } as React.CSSProperties}
                        className={`marker ${column.toLowerCase()} ${
                          isWinningMarker ? 'winning-marker' : ''
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
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
      const winResult = this.winCheck.checkForWin(this.currentPlayer);

      if (typeof winResult === 'string') {
        this.winningMarker = this.winCheck.getWinningCells();
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
