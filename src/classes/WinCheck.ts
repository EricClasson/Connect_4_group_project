export default class WinCheck {
  matrix: string[][];
  currentPlayer: string;

  constructor(matrix: string[][], currentPlayer: string) {
    this.matrix = matrix;
    this.currentPlayer = currentPlayer;
  }

  checkForWin(): boolean {
    const playerToCheck = this.currentPlayer;
    const streakLength = 4;
    const offsets = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      [
        [0, 0],
        [1, -1],
        [2, -2],
        [3, -3],
      ],
    ];

    for (let r = 0; r < this.matrix.length; r++) {
      for (let c = 0; c < this.matrix[0].length; c++) {
        for (let winType of offsets) {
          let colorsInCombo = '';
          for (let [ro, co] of winType) {
            if (r + ro >= 0 && r + ro < this.matrix.length && c + co >= 0 && c + co < this.matrix[0].length) {
              colorsInCombo += this.matrix[r + ro][c + co];
            } else {
              colorsInCombo += ' ';
            }
          }
          if (colorsInCombo === playerToCheck.repeat(streakLength)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
