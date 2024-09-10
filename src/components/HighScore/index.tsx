import React from 'react';
import { useEffect, useState } from 'react';
import { IState } from '../../App';
export default function HighScore({ state }: { state: IState }) {
  const { board, playerRed, playerYellow } = state;
  const highscoresData = JSON.parse(localStorage.getItem('highscores') || '[]') as { name: string; moves: number }[];
  const sortedHighscores = highscoresData.sort((a, b) => a.moves - b.moves).slice(0, 10);
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
  return (
    <div className='highscore-list'>
      <h3>Highscore List</h3>
      <table>
        <thead>
          <tr>
            <th>Name of Player</th>
            <th>Amount of Moves</th>
          </tr>
        </thead>
        <tbody>
          {sortedHighscores.map((list, index) => (
            <tr key={index}>
              <td>{list.name}</td>
              <td className=' highscore-moves'>{list.moves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
