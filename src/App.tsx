import './App.css';
import BoardClass from './classes/Board';
import { FormEvent, useState } from 'react';
import PlayerClass from './classes/Player';

function App() {
  const [state, _setState] = useState({
    board: new BoardClass(() => setState()),
    playerRed: null as PlayerClass | null,
    playerYellow: null as PlayerClass | null,
  });

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  };

  const { board, playerRed, playerYellow } = state;

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const playerRed = form.elements[0] as HTMLInputElement;
    const playerYellow = form.elements[1] as HTMLInputElement;
    state.playerRed = new PlayerClass(playerRed.value, 'Red');
    state.playerYellow = new PlayerClass(playerYellow.value, 'Yellow');
    console.log(state.playerYellow);
    console.log(state.playerRed);
    board.stateUpdater();
  }

  const CreatePlayer = () => {
    return (
      <form className="modal" onSubmit={registerName}>
        <h2>change player</h2>
        <div className="player-selection">
          <label>Red Player</label>
          <input
            type="text"
            name="playerRed"
            placeholder="Namn på röd spelare"
          />
        </div>
        <div className="player-selection">
          <label>Yellow Player</label>
          <input
            type="text"
            name="playerRed"
            placeholder="Namn på röd spelare"
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
    );
  };

  return (
    <>
      {!playerRed || !playerYellow ? <CreatePlayer /> : board.render()}
      {!board.gameOver ? (
        <div className="game-currentplayer"></div>
      ) : (
        <div className="gameover-info">
          {board.winner ? (
            <>
              <h2>The winner is</h2>

              <div>
                {' '}
                <h3
                  className={
                    state.board.winner === ''
                      ? ''
                      : state.board.winner === 'Red'
                      ? 'red-text'
                      : 'yellow-text'
                  }
                >
                  {state.board.winner}
                </h3>
                {/* <h2>({state.board.currentPlayer})</h2> */}
              </div>
            </>
          ) : (
            <>
              {' '}
              <h2>It's a tie.</h2>
            </>
          )}
          <div className="gameover-btn">
            <button>Reset Game</button>

            <button>New game</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
