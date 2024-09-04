import Board from './Board.js';

export default class Player {
  name: string;
  color: string;
  isAI: boolean;
  isSmart: boolean;

  constructor(name: string, color: string, isAI: boolean = false, isSmart: boolean = false) {
    this.name = name;
    this.color = color;
    this.isAI = isAI;
    this.isSmart = isSmart;
  }

  makeAIMove(board: Board): void {
    let column: number;
    if (!this.isSmart) {
      do {
        column = Math.floor(Math.random() * 7);
      } while (!board.makeMove(column));
      return;
    }
    // Smart Computer
    // First check if there is a winning move
    // Then check if there is a move to block the opponent
    // If none of the above, make a random move
    column = this.findWinningMove(board);
    if (column === -1) {
      column = this.findBlock(board);
    }
    if (column === -1) {
      do {
        column = Math.floor(Math.random() * 7);
      } while (!board.makeMove(column));
    } else {
      board.makeMove(column);
    }
  }
  findWinningMove(board: Board): number {
    for (let column = 0; column < 7; column++) {
      const tempBoard = new Board(board.stateUpdater);
      tempBoard.matrix = board.matrix.map((row) => [...row]);
      tempBoard.currentPlayer = this.color;
      if (tempBoard.makeMove(column)) {
        if (tempBoard.winCheck.checkForWin(this.color) === this.color) {
          return column;
        }
      }
    }
    return -1;
  }
  findBlock(board: Board): number {
    const opponentColor = this.color === 'Red' ? 'Yellow' : 'Red';
    for (let column = 0; column < 7; column++) {
      const tempBoard = new Board(board.stateUpdater);
      tempBoard.matrix = board.matrix.map((row) => [...row]);
      tempBoard.currentPlayer = opponentColor;
      if (tempBoard.makeMove(column)) {
        if (tempBoard.winCheck.checkForWin(opponentColor) === opponentColor) {
          return column;
        }
      }
    }

    return -1;
  }
}
