import WinCheck from './WinCheck.js';
import MakeMoveCheck from './MakeMoveCheck.js';

export default class Board {
  matrix: string[][];
  currentPlayer: string;
  winCheck: WinCheck;
  MakeMoveCheck: MakeMoveCheck;

  constructor() {
    this.matrix = Array.from({ length: 6 }, () => Array(7).fill(' '));
    this.currentPlayer = 'Red';
    this.winCheck = new WinCheck(this.matrix, this.currentPlayer);
    this.MakeMoveCheck = new MakeMoveCheck(this.matrix, this.currentPlayer);
  }

  render(): void {
    console.clear();
    const colorSymbols: { [key: string]: string } = {
      Red: '🔴',
      Yellow: '🟡',
    };

    console.log(
      this.matrix.map(row => '|' + row.map(cell => colorSymbols[cell] || '  ').join('|') + '|').join('\n' + '-'.repeat(22) + '\n')
    );
  }

  makeMove(column: number): boolean {
    const success = this.MakeMoveCheck.makeMove(column);
    if (success) {
      this.currentPlayer = this.currentPlayer === 'Red' ? 'Yellow' : 'Red';
      this.winCheck = new WinCheck(this.matrix, this.currentPlayer);
      this.MakeMoveCheck = new MakeMoveCheck(this.matrix, this.currentPlayer);
    }
    return success;
  }

  checkForWin(): boolean {
    return this.winCheck.checkForWin();
  }

  draw(): boolean {
    return this.matrix[0].every(cell => cell !== ' ');
  }
}
