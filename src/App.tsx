import './App.css';
import './styles/registerCreatePlayer.css';

import BoardClass from './classes/Board';
import { FormEvent, useState } from 'react';
import PlayerClass from './classes/Player';

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
    const playerRedInput = form.elements[0] as HTMLInputElement;
    const playerYellowInput = form.elements[1] as HTMLInputElement;
    // under this is ai players red and yellow hard ore Easy
    const playAgainstRedAiEasy = form.elements[2] as HTMLInputElement;
    const playAgainstRedAiHard = form.elements[3] as HTMLSelectElement;
    const playAgainstYellowAiEasy = form.elements[4] as HTMLInputElement;
    const playAgainstYellowAiHard = form.elements[5] as HTMLSelectElement;

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

  return <>{!playerRed || !playerYellow ? <CreatePlayer /> : board.render()}</>;
}

export default App;
