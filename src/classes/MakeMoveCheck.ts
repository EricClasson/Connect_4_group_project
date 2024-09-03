import Board from './Board';
export default class MakeMoveCheck {
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  makeMoveCheck(column: number): boolean {
    if (column < 0 || column >= 7) return false;

    for (let row = this.board.matrix.length - 1; row >= 0; row--) {
      if (this.board.matrix[row][column] === ' ') {
        this.board.matrix[row][column] = this.board.currentPlayer;
        return true;
      }
    }
    return false;
  }
}
