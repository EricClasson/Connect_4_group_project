import './App.css';
import './styles/registerCreatePlayer.css';
import CreatePlayer from './components/CreatePlayer';
import ViewWinner from './components/Winner';
import BoardClass from './classes/Board';
import { useEffect, useState } from 'react';
import PlayerClass from './classes/Player';

export interface IState {
  board: BoardClass;
  playerRed: PlayerClass | null;
  playerYellow: PlayerClass | null;
}
function App() {
  const COMPUTER_DELAY = 1000;
  const [state, _setState] = useState<IState>({
    board: new BoardClass(() => setState()),
    playerRed: null as PlayerClass | null,
    playerYellow: null as PlayerClass | null,
  });

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  };

  const { board, playerRed, playerYellow } = state;

  const highScore = (name: string, moves: number) => {
    const highscores = JSON.parse(localStorage.getItem('highscores') || '[]') as { name: string; moves: number }[];

    highscores.push({ name, moves });
    highscores.sort((a, b) => a.moves - b.moves).slice(0, 10);

    localStorage.setItem('highscores', JSON.stringify(highscores));
  };

  const [scoreUpdated, setScoreUpdated] = useState(false);

  useEffect(() => {
    if (board.gameOver && board.winner && !scoreUpdated) {
      const winnerName = state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name;

      const winnerMoves = state.board.winner === 'Yellow' ? board.moveCounterRed : board.moveCounterYellow;
      highScore(winnerName, winnerMoves);

      setScoreUpdated(true);
    }
  }, [board.gameOver, board.winner, scoreUpdated]);

  useEffect(() => {
    if (playerYellow?.isAI && board.currentPlayer === 'Yellow' && !board.gameOver) {
      setTimeout(() => playerYellow.makeAIMove(board), COMPUTER_DELAY);
    }
    if (playerRed?.isAI && board.currentPlayer === 'Red' && !board.gameOver) {
      setTimeout(() => playerRed.makeAIMove(board), COMPUTER_DELAY);
    }
  }, [setState, playerRed, playerYellow, board]);

  return (
    <>
      {!playerRed || !playerYellow ? <CreatePlayer state={state} /> : board.render(playerRed, playerYellow)}
      {!board.gameOver ? <div className="game-currentplayer"></div> : <ViewWinner state={state} setState={setState} />}
    </>
  );
}

export default App;
