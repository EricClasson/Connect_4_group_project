import { IState } from '../../App';
import BoardClass from '../../classes/Board';
export default function ViewWinner({ state, setState }: { state: IState; setState: Function }) {
  const { board, playerRed, playerYellow } = state;
  const handleResetGame = () => {
    board.resetBoard();
  };

  const handleNewGame = () => {
    setState('board', new BoardClass(() => setState()));
    setState('playerRed', null);
    setState('playerYellow', null);
    window.location.reload();
  };
  return (
    <div className='gameover-info'>
      {board.winner ? (
        <>
          <h2>The winner is</h2>

          <div className='winner-display'>
            {' '}
            <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
              {' '}
              {state.board.winner}
            </h3>
            <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
              {state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name}
            </h3>
          </div>
        </>
      ) : (
        <>
          {' '}
          <h2>It's a tie.</h2>
        </>
      )}

      <button
        className='reset-btn btn'
        onClick={handleResetGame}
      >
        Play Again
      </button>
      <button
        className='reset-btn btn'
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
}
