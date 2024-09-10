import './App.css';
import './styles/registerCreatePlayer.css';
import CreatePlayer from './components/CreatePlayer';
import ViewWinner from './components/Winner';
import BoardClass from './classes/Board';
import { FormEvent, useEffect, useState } from 'react';
import PlayerClass from './classes/Player';
import { Fragment } from 'react';
export interface IState {
  board: BoardClass;
  playerRed: PlayerClass | null;
  playerYellow: PlayerClass | null;
}
function App() {
  // const [errorMessageRed, setErrorMessageRed] = useState<string>('');
  // const [errorMessageYellow, setErrorMessageYellow] = useState<string>('');
  // const [isToggled, setIsToggled] = useState(false);
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

  // function registerName(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const playerRedName = form.elements.namedItem('playerRed') as HTMLInputElement;
  //   const playerYellowName = form.elements.namedItem('playerYellow') as HTMLInputElement;
  //   const playerYellowOption = form.elements.namedItem('playerYellowOption') as HTMLInputElement;
  //   const playerRedOption = form.elements.namedItem('playerRedOption') as HTMLInputElement;
  //   console.log(playerYellowOption.value);

  //   const isNameValid = (name: string) => {
  //     return name.trim() !== '' && isNaN(Number(name));
  //   };

  //   if (!isNameValid(playerRedName.value)) {
  //     setErrorMessageRed('Please enter a valid name for the Red player.');
  //     return;
  //   }

  //   if (!isNameValid(playerYellowName.value)) {
  //     setErrorMessageYellow('Please enter a valid name for the Yellow player.');
  //     return;
  //   }
  //   setErrorMessageRed('');
  //   setErrorMessageYellow('');

  //   switch (playerRedOption.value) {
  //     case 'human':
  //       state.playerRed = new PlayerClass(playerRedName.value, 'Red', false, false);
  //       break;
  //     case 'false':
  //       state.playerRed = new PlayerClass(playerRedName.value, 'Red', true, false);
  //       break;
  //     case 'true':
  //       state.playerRed = new PlayerClass(playerRedName.value, 'Red', true, true);
  //       break;
  //   }
  //   switch (playerYellowOption.value) {
  //     case 'human':
  //       state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', false, false);
  //       break;
  //     case 'false':
  //       state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', true, false);
  //       break;
  //     case 'true':
  //       state.playerYellow = new PlayerClass(playerYellowName.value, 'Yellow', true, true);
  //       break;
  //   }
  //   board.stateUpdater();
  // }

  useEffect(() => {
    if (playerYellow?.isAI && board.currentPlayer === 'Yellow' && !board.gameOver) {
      setTimeout(() => playerYellow.makeAIMove(board), COMPUTER_DELAY);
    }
    if (playerRed?.isAI && board.currentPlayer === 'Red' && !board.gameOver) {
      setTimeout(() => playerRed.makeAIMove(board), COMPUTER_DELAY);
    }
  }, [setState, playerRed, playerYellow, board]);

  // const CreatePlayer = () => {
  // return (
  //   <>
  //     <form
  //       className='modal'
  //       onSubmit={registerName}
  //     >
  //       <h2>Connect Four</h2>
  //       <div className='player-selection player-red'>
  //         <label htmlFor='playerRed'>Red Player</label>
  //         <input
  //           type='text'
  //           name='playerRed'
  //           placeholder='Name for red player'
  //         />
  //         {errorMessageRed && <p style={{ color: 'red' }}>{errorMessageRed}</p>}
  //         <div className='modal-option'>
  //           <label htmlFor='humanRed'>
  //             Human
  //             <input
  //               type='radio'
  //               defaultChecked
  //               name='playerRedOption'
  //               id='humanRed'
  //               value={'human'}
  //             />
  //           </label>
  //           <label htmlFor='aiEasyRed'>
  //             Ai - Easy
  //             <input
  //               type='radio'
  //               name='playerRedOption'
  //               id='aiEasyRed'
  //               value={'false'}
  //             />
  //           </label>
  //           <label htmlFor='aiHardRed'>
  //             Ai - Hard
  //             <input
  //               type='radio'
  //               name='playerRedOption'
  //               id='aiHardRed'
  //               value={'true'}
  //             />
  //           </label>
  //         </div>
  //       </div>
  //       <div className='player-selection player-yellow'>
  //         <label>Yellow Player</label>
  //         <input
  //           type='text'
  //           name='playerYellow'
  //           placeholder='Name for yellow player'
  //         />
  //         {errorMessageYellow && <p style={{ color: 'red' }}>{errorMessageYellow}</p>}
  //         <div className='modal-option'>
  //           <label htmlFor='humanYellow'>
  //             Human
  //             <input
  //               type='radio'
  //               defaultChecked
  //               name='playerYellowOption'
  //               id='humanYellow'
  //               value={'human'}
  //             />
  //           </label>
  //           <label htmlFor='aiEasyYellow'>
  //             Ai - Easy
  //             <input
  //               type='radio'
  //               name='playerYellowOption'
  //               id='aiEasyYellow'
  //               value={'false'}
  //             />
  //           </label>
  //           <label htmlFor='aiHardYellow'>
  //             Ai - Hard
  //             <input
  //               type='radio'
  //               name='playerYellowOption'
  //               id='aiHardYellow'
  //               value={'true'}
  //             />
  //           </label>
  //         </div>
  //       </div>
  //       <button
  //         className='btn'
  //         type='submit'
  //       >
  //         Start Game
  //       </button>
  //       <button
  //         className='btn'
  //         onClick={() => setIsToggled(!isToggled)}
  //       >
  //         {isToggled ? 'Close HighScore List' : 'View HighScore List'}
  //       </button>
  //       <div>{isToggled && <ViewHighScoreList />}</div>
  //     </form>
  //   </>
  // );
  // };

  // const highScore = (name: string, moves: number) => {
  //   const highscores = JSON.parse(localStorage.getItem('highscores') || '[]') as { name: string; moves: number }[];

  //   highscores.push({ name, moves });
  //   highscores.sort((a, b) => a.moves - b.moves).slice(0, 10);

  //   localStorage.setItem('highscores', JSON.stringify(highscores));
  // };

  // const [scoreUpdated, setScoreUpdated] = useState(false);

  // useEffect(() => {
  //   if (board.gameOver && board.winner && !scoreUpdated) {
  //     let winnerName = state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name;

  //     let winnerMoves = state.board.winner === 'Yellow' ? board.moveCounterRed : board.moveCounterYellow;
  //     highScore(winnerName, winnerMoves);

  //     setScoreUpdated(true);
  //   }
  // }, [board.gameOver, board.winner, scoreUpdated]);

  // const ViewHighScoreList = () => {
  //   const highscoresData = JSON.parse(localStorage.getItem('highscores') || '[]') as { name: string; moves: number }[];
  //   const sortedHighscores = highscoresData.sort((a, b) => a.moves - b.moves).slice(0, 10);
  //   return (
  //     <div className='highscore-list'>
  //       <h3>Highscore List</h3>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Name of Player</th>
  //             <th>Amount of Moves</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {sortedHighscores.map((list, index) => (
  //             <tr key={index}>
  //               <td>{list.name}</td>
  //               <td className=' highscore-moves'>{list.moves}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // const handleResetGame = () => {
  //   board.resetBoard();
  // };

  // const handleNewGame = () => {
  //   setState('board', new BoardClass(() => setState()));
  //   setState('playerRed', null);
  //   setState('playerYellow', null);
  //   window.location.reload();
  // };
  // const ViewWinner = () => {
  //   return (
  //     <div className='gameover-info'>
  //       {board.winner ? (
  //         <>
  //           <h2>The winner is</h2>

  //           <div className='winner-display'>
  //             {' '}
  //             <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
  //               {' '}
  //               {state.board.winner}
  //             </h3>
  //             <h3 className={state.board.winner === '' ? '' : state.board.winner === 'Red' ? 'red-text' : 'yellow-text'}>
  //               {state.board.winner === 'Red' ? playerRed!.name : playerYellow!.name}
  //             </h3>
  //           </div>
  //         </>
  //       ) : (
  //         <>
  //           {' '}
  //           <h2>It's a tie.</h2>
  //         </>
  //       )}

  //       <button
  //         className='reset-btn btn'
  //         onClick={handleResetGame}
  //       >
  //         Reset Game
  //       </button>
  //       <button
  //         className='reset-btn btn'
  //         onClick={handleNewGame}
  //       >
  //         New Game
  //       </button>
  //     </div>
  //   );
  // };

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
