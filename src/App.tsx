import './App.css';
import BoardClass from './classes/Board';
import { FormEvent, useEffect, useState } from 'react';
import PlayerClass from './classes/Player';
import { Fragment } from 'react';

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

  const highScore = (name: string, moves: number) => {
    const highscores = JSON.parse(
      localStorage.getItem('highscores') || '[]'
    ) as { name: string; moves: number }[];

    highscores.push({ name, moves });
    highscores.sort((a, b) => a.moves - b.moves);

    localStorage.setItem('highscores', JSON.stringify(highscores));
  };

  const [scoreUpdated, setScoreUpdated] = useState(false);

  useEffect(() => {
    if (board.gameOver && board.winner && !scoreUpdated) {
      let winnerName =
        state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name;

      let winnerMoves =
        state.board.winner === 'Yellow'
          ? board.moveCounterRed
          : board.moveCounterYellow;
      highScore(winnerName, winnerMoves);

      setScoreUpdated(true);
    }
  }, [board.gameOver, board.winner, scoreUpdated]);

  const ViewHighScoreList = () => {
    const highscoresData = JSON.parse(
      localStorage.getItem('highscores') || '[]'
    ) as { name: string; moves: number }[];

    return (
      <ul className="highscore-list">
        <h3>Highscorelist</h3>
        {highscoresData.map((list, index) => (
          <li key={index}>
            <p>Name on player: {list.name}</p>
            <p>Amount moves for win: {list.moves}</p>
          </li>
        ))}
      </ul>
    );
  };

  const ViewWinner = () => {
    return (
      <div className="gameover-info">
        {board.winner ? (
          <>
            <h2>The winner is</h2>

            <div className="winner-display">
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
                {' '}
                ({state.board.winner})
              </h3>
              <h3
                className={
                  state.board.winner === ''
                    ? ''
                    : state.board.winner === 'Red'
                    ? 'red-text'
                    : 'yellow-text'
                }
              >
                {state.board.winner === 'Red'
                  ? playerRed!.name
                  : playerYellow!.name}
              </h3>
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
    );
  };

  return (
    <>
      {!playerRed || !playerYellow ? (
        <CreatePlayer />
      ) : (
        board.render(playerRed, playerYellow)
      )}
      <ViewHighScoreList />
      {!board.gameOver ? (
        <div className="game-currentplayer"></div>
      ) : (
        <ViewWinner />
      )}
    </>
  );
}

export default App;
