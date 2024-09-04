import Board from './Board.js';

export default class Player {
  name: string;
  color: string;
  isAI: boolean;

  constructor(name: string, color: string, isAI: boolean = false) {
    this.name = name;
    this.color = color;
    this.isAI = isAI;
  }

  makeAIMove(board: Board): void {
    let column: number;
    do {
      column = Math.floor(Math.random() * 7);
    } while (!board.makeMove(column));
  }

  makePlayerMove(board: Board): boolean {
    console.log(`Det är ${this.name}'s tur att spela.`);
    const column = parseInt('Ange kolumn (1-7): ', 10) - 1;

    if (column < 0 || column >= 7) {
      console.log('Ogiltigt kolumnnummer, försök igen.');
      return false;
    }

    if (!board.makeMove(column)) {
      console.log('Kolumnen är full eller ogiltigt drag, försök igen.');
      return false;
    }

    return true;
  }
}
