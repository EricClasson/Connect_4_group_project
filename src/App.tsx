import './App.css';
import './styles/registerCreatePlayer.css';

import BoardClass from './classes/Board';
import { FormEvent, useEffect, useState } from 'react';
import PlayerClass from './classes/Player';
import { Fragment } from 'react';

class EasyAIClass extends PlayerClass {
  constructor(name: string, color: string) {
    super(name, color);
  }
}

class HardAIClass extends PlayerClass {
  constructor(name: string, color: string) {
    super(name, color);
  }
}

function App() {
  const COMPUTER_DELAY = 1000;
  const [state, _setState] = useState({
    board: new BoardClass(() => setState()),
    playerRed: null as PlayerClass | null,
    playerYellow: null as PlayerClass | null,
  });

  const setState = (prop: string = '', value: any = '') => {
    _setState({ ...state, [prop]: value });
  };

  const { board, playerRed, playerYellow } = state;

  useEffect(() => {
    if (
      playerYellow?.isAI &&
      board.currentPlayer === 'Yellow' &&
      !board.gameOver
    ) {
      setTimeout(() => playerYellow.makeAIMove(board), COMPUTER_DELAY);
    }
    if (playerRed?.isAI && board.currentPlayer === 'Red' && !board.gameOver) {
      setTimeout(() => playerRed.makeAIMove(board), COMPUTER_DELAY);
    }
  }, [setState]);

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const playerRedInput = form.elements[0] as HTMLInputElement;
    const playerYellowInput = form.elements[1] as HTMLInputElement;
    // under this is ai players red and yellow hard ore Easy
    const playAgainstRedAiEasy = form.elements[2] as HTMLInputElement;
    const playAgainstRedAiHard = form.elements[3] as HTMLSelectElement;
    const playAgainstYellowAiEasy = form.elements[4] as HTMLInputElement;
    const playAgainstYellowAiHard = form.elements[5] as HTMLSelectElement;

    const isNameValid = (name: string) => {
      return name.trim() !== '' && isNaN(Number(name));
    };

    if (!playAgainstRedAiEasy.checked && !isNameValid(playerRedInput.value)) {
      alert('Please enter a valid name for the Red player.');
      return;
    }

    if (
      !playAgainstYellowAiEasy.checked &&
      !isNameValid(playerYellowInput.value)
    ) {
      alert('Please enter a valid name for the Yellow player.');
      return;
    }

    if (playAgainstRedAiEasy.checked) {
      state.playerRed =
        playAgainstRedAiHard.value === 'easy'
          ? new EasyAIClass('AI Red', 'Red')
          : new HardAIClass('AI Red', 'Red');
    } else {
      state.playerRed = new PlayerClass(playerRedInput.value, 'Red');
    }

    if (playAgainstYellowAiEasy.checked) {
      state.playerYellow =
        playAgainstYellowAiHard.value === 'easy'
          ? new EasyAIClass('AI Yellow', 'Yellow')
          : new HardAIClass('AI Yellow', 'Yellow');
    } else {
      state.playerYellow = new PlayerClass(playerYellowInput.value, 'Yellow');
    }

    console.log(state.playerYellow);
    console.log(state.playerRed);
    board.stateUpdater();
  }

  const CreatePlayer = () => {
    return (
      <form className="modal" onSubmit={registerName}>
        <h2>Change player</h2>
        <div className="player-selection">
          <label>Red Player</label>
          <input
            type="text"
            name="playerRed"
            placeholder="Namn på röd spelare"
          />
        </div>
        <label>
          <input type="checkbox" name="playAgainstRedAi" /> Play against AI
        </label>
        <select name="difficultyRedAi">
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>
        <div className="player-selection">
          <label>Yellow Player</label>
          <input
            type="text"
            name="playerYellow"
            placeholder="Namn på gul spelare"
          />
        </div>
        <label>
          <input type="checkbox" name="playAgainstYellowAi" /> Play against AI
        </label>
        <select name="difficultyYellowAi">
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>
        <section className="center-button">
          <button type="submit">Start Game</button>
        </section>
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

  const handleResetGame = () => {
    board.resetBoard();
  };

  const handleNewGame = () => {
    setState('board', new BoardClass(() => setState()));
    setState('playerRed', null);
    setState('playerYellow', null);
    window.location.reload();
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
                {state.board.winner}
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

        <button className="reset-btn btn" onClick={handleResetGame}>
          Reset Game
        </button>
        <button className="reset-btn btn" onClick={handleNewGame}>
          New Game
        </button>
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
