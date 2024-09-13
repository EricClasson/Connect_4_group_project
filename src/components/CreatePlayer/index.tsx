import { useState, FormEvent } from 'react';
import { IState } from '../../App';
import PlayerClass from '../../classes/Player';
import HighScore from '../HighScore';
import fileToBase64 from '../../lib/fileToBase64';

export default function CreatePlayer({ state }: { state: IState }) {
  const [errorMessageRed, setErrorMessageRed] = useState<string>('');
  const [errorMessageYellow, setErrorMessageYellow] = useState<string>('');
  const [isToggled, setIsToggled] = useState(false);
  const { board } = state;

  async function registerName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const playerRedName = form.elements.namedItem(
      'playerRed'
    ) as HTMLInputElement;
    const playerYellowName = form.elements.namedItem(
      'playerYellow'
    ) as HTMLInputElement;
    const playerYellowOption = form.elements.namedItem(
      'playerYellowOption'
    ) as HTMLInputElement;
    const playerRedOption = form.elements.namedItem(
      'playerRedOption'
    ) as HTMLInputElement;
    const playerRedFile = form.elements.namedItem(
      'playerRedFile'
    ) as HTMLInputElement;
    const playerYellowFile = form.elements.namedItem(
      'playerYellowFile'
    ) as HTMLInputElement;

    const redImage = (await fileToBase64(playerRedFile)) as string;
    const yellowImage = (await fileToBase64(playerYellowFile)) as string;

    const isNameValid = (name: string) => {
      return name.trim() !== '' && isNaN(Number(name));
    };

    if (!isNameValid(playerRedName.value)) {
      setErrorMessageRed('Please enter a valid name for the Red player.');
      return;
    }

    if (!isNameValid(playerYellowName.value)) {
      setErrorMessageYellow('Please enter a valid name for the Yellow player.');
      return;
    }
    setErrorMessageRed('');
    setErrorMessageYellow('');

    switch (playerRedOption.value) {
      case 'human':
        state.playerRed = new PlayerClass(
          playerRedName.value,
          'Red',
          false,
          false,
          redImage
        );
        break;
      case 'false':
        state.playerRed = new PlayerClass(
          playerRedName.value,
          'Red',
          true,
          false,
          redImage
        );
        break;
      case 'true':
        state.playerRed = new PlayerClass(
          playerRedName.value,
          'Red',
          true,
          true,
          redImage
        );
        break;
    }
    switch (playerYellowOption.value) {
      case 'human':
        state.playerYellow = new PlayerClass(
          playerYellowName.value,
          'Yellow',
          false,
          false,
          yellowImage
        );
        break;
      case 'false':
        state.playerYellow = new PlayerClass(
          playerYellowName.value,
          'Yellow',
          true,
          false,
          yellowImage
        );
        break;
      case 'true':
        state.playerYellow = new PlayerClass(
          playerYellowName.value,
          'Yellow',
          true,
          true,
          yellowImage
        );
        break;
    }
    board.stateUpdater();
  }
  return (
    <>
      <form className="modal" onSubmit={registerName}>
        <h2>Connect Four</h2>
        <div className="player-selection player-red">
          <label htmlFor="playerRed">Red Player</label>
          <input
            type="text"
            name="playerRed"
            placeholder="Name for red player"
          />
          {errorMessageRed && (
            <p className="error-message" style={{ color: 'red' }}>
              {errorMessageRed}
            </p>
          )}
          <div className="modal-option">
            <label htmlFor="humanRed">
              Human
              <input
                type="radio"
                defaultChecked
                name="playerRedOption"
                id="humanRed"
                value={'human'}
              />
            </label>
            <label htmlFor="aiEasyRed">
              AI - Easy
              <input
                type="radio"
                name="playerRedOption"
                id="aiEasyRed"
                value={'false'}
              />
            </label>
            <label htmlFor="aiHardRed">
              AI - Hard
              <input
                type="radio"
                name="playerRedOption"
                id="aiHardRed"
                value={'true'}
              />
            </label>
          </div>
          <label className="file-label">Lägg till bild nedan</label>
          <input
            type="file"
            title="Red photo"
            className="file-input"
            name="playerRedFile"
            id="playerRedFile"
          />
        </div>
        <div className="player-selection player-yellow">
          <label>Yellow Player</label>
          <input
            type="text"
            name="playerYellow"
            placeholder="Name for yellow player"
          />
          {errorMessageYellow && (
            <p className="error-message" style={{ color: 'red' }}>
              {errorMessageYellow}
            </p>
          )}
          <div className="modal-option">
            <label htmlFor="humanYellow">
              Human
              <input
                type="radio"
                defaultChecked
                name="playerYellowOption"
                id="humanYellow"
                value={'human'}
              />
            </label>
            <label htmlFor="aiEasyYellow">
              AI - Easy
              <input
                type="radio"
                name="playerYellowOption"
                id="aiEasyYellow"
                value={'false'}
              />
            </label>
            <label htmlFor="aiHardYellow">
              AI - Hard
              <input
                type="radio"
                name="playerYellowOption"
                id="aiHardYellow"
                value={'true'}
              />
            </label>
          </div>
          <label className="file-label">Lägg till bild nedan</label>
          <input
            type="file"
            title="Yellow photo"
            name="playerYellowFile"
            id="playerYellowFile"
            className="file-input"
          />
        </div>

        <button className="btn" type="submit">
          Start Game
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setIsToggled(!isToggled)}
        >
          {isToggled ? 'Close HighScore List' : 'View HighScore List'}
        </button>
        <div>{isToggled && <HighScore />}</div>
      </form>
    </>
  );
}
