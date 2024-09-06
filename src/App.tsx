import './App.css';
import './styles/registerCreatePlayer.css';

import BoardClass from './classes/Board';
import { FormEvent, useEffect, useState } from 'react';
import PlayerClass from './classes/Player';

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

  function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const playerRedName = form.elements.namedItem('playerRed') as HTMLInputElement;
    const playerYellowName = form.elements.namedItem('playerYellow') as HTMLInputElement;
    const playerYellowOption = form.elements.namedItem('playerYellowOption') as HTMLInputElement;
    const playerRedOption = form.elements.namedItem('playerRedOption') as HTMLInputElement;
    console.log(playerYellowOption.value);

    const isNameValid = (name: string) => {
      return name.trim() !== '' && isNaN(Number(name));
    };

    if (!isNameValid(playerRedName.value)) {
      alert('Please enter a valid name for the Red player.');
      return;
    }

    if (!isNameValid(playerYellowName.value)) {
      alert('Please enter a valid name for the Yellow player.');
      return;
    }

    switch (playerRedOption.value) {
      case 'human':
        state.playerRed = new PlayerClass(playerRedName.value, 'Red', false, false);
        break;
      case 'false':
        state.playerRed = new PlayerClass(playerRedName.value, 'Red', true, false);
        break;
      case 'true':
        state.playerRed = new PlayerClass(playerRedName.value, 'Red', true, true);
        break;
    }
    switch (playerYellowOption.value) {
      case 'human':
        state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', false, false);
        break;
      case 'false':
        state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', true, false);
        break;
      case 'true':
        state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', true, true);
        break;
    }
    board.stateUpdater();
  }

  useEffect(() => {
    if (playerYellow?.isAI && board.currentPlayer === 'Yellow' && !board.gameOver) {
      setTimeout(() => playerYellow.makeAIMove(board), COMPUTER_DELAY);
    }
    if (playerRed?.isAI && board.currentPlayer === 'Red' && !board.gameOver) {
      setTimeout(() => playerRed.makeAIMove(board), COMPUTER_DELAY);
    }
  }, [setState]);

  const CreatePlayer = () => {
    return (
      <form className="modal" onSubmit={registerName}>
        <h2>Connect Four</h2>
        <div className="player-selection player-red">
          <label htmlFor="playerRed">Red Player</label>
          <input type="text" name="playerRed" placeholder="Name for red player" />
          <div className="modal-option">
            <label htmlFor="humanRed">
              Human
              <input type="radio" defaultChecked name="playerRedOption" id="humanRed" value={'human'} />
            </label>
            <label htmlFor="aiEasyRed">
              Ai - Easy
              <input type="radio" name="playerRedOption" id="aiEasyRed" value={'false'} />
            </label>
            <label htmlFor="aiHardRed">
              Ai - Hard
              <input type="radio" name="playerRedOption" id="aiHardRed" value={'true'} />
            </label>
          </div>
        </div>
        <div className="player-selection player-yellow">
          <label>Yellow Player</label>
          <input type="text" name="playerYellow" placeholder="Name for yellow player" />
          <div className="modal-option">
            <label htmlFor="humanYellow">
              Human
              <input type="radio" defaultChecked name="playerYellowOption" id="humanYellow" value={'human'} />
            </label>
            <label htmlFor="aiEasyYellow">
              Ai - Easy
              <input type="radio" name="playerYellowOption" id="aiEasyYellow" value={'false'} />
            </label>
            <label htmlFor="aiHardYellow">
              Ai - Hard
              <input type="radio" name="playerYellowOption" id="aiHardYellow" value={'true'} />
            </label>
          </div>
        </div>
        <button className="btn" type="submit">
          Start Game
        </button>
      </form>
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
              <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
                {' '}
                ({state.board.winner})
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
        <div className="gameover-btn">
          <button className="reset-btn" onClick={handleResetGame}>
            Reset Game
          </button>
          <button className="reset-btn" onClick={handleNewGame}>
            New Game
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {!playerRed || !playerYellow ? <CreatePlayer /> : board.render(playerRed, playerYellow)}
      {!board.gameOver ? <div className="game-currentplayer"></div> : <ViewWinner />}
    </>
  );
}

export default App;
