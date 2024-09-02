import Board from './Board.js';
import Player from './Player.js';
import prompt from 'prompt-sync';

const getPrompt = prompt();

export default class Game {
  board: Board;
  playerRed?: Player;
  playerYellow?: Player;

  constructor() {
    this.createPlayers();
    this.board = new Board();
    this.startGameLoop();
  }

  createPlayers(): void {
    console.clear();
    console.log('Välkommen till FYRA-I-RAD!\n');

    const isRedAI = getPrompt('Ska spelare Röd vara AI? (ja/nej): ').toLowerCase() === 'ja';
    const isYellowAI = getPrompt('Ska spelare Gul vara AI? (ja/nej): ').toLowerCase() === 'ja';

    const nameRed = isRedAI ? 'AI-Röd' : getPrompt('Spelare Röd:s namn: ');
    const nameYellow = isYellowAI ? 'AI-Gul' : getPrompt('Spelare Gul:s namn: ');

    this.playerRed = new Player(nameRed, 'Red', isRedAI);
    this.playerYellow = new Player(nameYellow, 'Yellow', isYellowAI);
  }

  getPlayersName(): string | undefined {
    return this.board.currentPlayer === 'Red' ? this.playerRed?.name : this.playerYellow?.name;
  }

  playAgain(): void {
    const playAgain = getPrompt('Spela igen? (ja/nej):').toLowerCase();
    if (playAgain === 'ja') {
      this.board = new Board();
      this.startGameLoop();
    }
  }

  startGameLoop(): void {
    this.board.render();
    const currentPlayer = this.board.currentPlayer;

    if (currentPlayer === 'Red' && this.playerRed?.isAI) {
      console.log(`AI (${this.playerRed.name}) spelar...`);
      setTimeout(() => {
        this.playerRed?.makeAIMove(this.board);
        this.checkGameState();
      }, 800);
    } else if (currentPlayer === 'Yellow' && this.playerYellow?.isAI) {
      console.log(`AI (${this.playerYellow.name}) spelar...`);
      setTimeout(() => {
        this.playerYellow?.makeAIMove(this.board);
        this.checkGameState();
      }, 800);
    } else if (currentPlayer === 'Red') {
      if (!this.playerRed?.makePlayerMove(this.board)) {
        setTimeout(() => this.startGameLoop(), 1000);
        return;
      }
      this.checkGameState();
    } else if (currentPlayer === 'Yellow') {
      if (!this.playerYellow?.makePlayerMove(this.board)) {
        setTimeout(() => this.startGameLoop(), 1000);
        return;
      }
      this.checkGameState();
    }
  }

  checkGameState(): void {
    if (this.board.checkForWin()) {
      this.board.render();
      const winningPlayer = this.board.currentPlayer === 'Red' ? this.playerYellow : this.playerRed;
      console.log(`Grattis ${winningPlayer?.name}! Du vann!`);
      this.playAgain();
      return;
    }
    if (this.board.draw()) {
      this.board.render();
      console.log('Spelet är oavgjort!');
      this.playAgain();
      return;
    }
    setTimeout(() => this.startGameLoop(), 100);
  }
}
