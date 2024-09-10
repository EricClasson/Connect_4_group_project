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
      {!board.gameOver ? (
        <div className='game-currentplayer'></div>
      ) : (
        <ViewWinner
          state={state}
          setState={setState}
        />
      )}
    </>
  );
}

export default App;
