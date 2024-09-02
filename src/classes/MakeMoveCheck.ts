export default class MakeMoveCheck {
  matrix: string[][];
  currentPlayer: string;

  constructor(matrix: string[][], currentPlayer: string) {
    this.matrix = matrix;
    this.currentPlayer = currentPlayer;
  }

  makeMoveCheck(column: number): boolean {
    if (column < 0 || column >= 7) return false;

    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === ' ') {
        this.matrix[row][column] = this.currentPlayer;
        return true;
      }
    }
    return false;
  }
}
