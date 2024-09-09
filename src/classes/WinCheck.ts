import Board from './Board';
export default class WinCheck {
  board: Board;
  winningMarkers: [number, number][];

  constructor(board: Board) {
    this.board = board;
    this.winningMarkers = [];
  }

  checkForWin(playerToCheck: string): boolean | string {
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

    for (let r = 0; r < this.board.matrix.length; r++) {
      for (let c = 0; c < this.board.matrix[0].length; c++) {
        for (const winType of offsets) {
          let colorsInCombo = '';
          const potentialWinningMarker: [number, number][] = [];
          for (const [ro, co] of winType) {
            if (r + ro >= 0 && r + ro < this.board.matrix.length && c + co >= 0 && c + co < this.board.matrix[0].length) {
              colorsInCombo += this.board.matrix[r + ro][c + co];
              potentialWinningMarker.push([r + ro, c + co]);
            } else {
              colorsInCombo += ' ';
            }
          }
          if (colorsInCombo === playerToCheck.repeat(streakLength)) {
            this.winningMarkers = potentialWinningMarker;
            return playerToCheck;
          }
        }
      }
    }

    return false;
  }
  getWinningCells(): [number, number][] {
    return this.winningMarkers;
  }
}
