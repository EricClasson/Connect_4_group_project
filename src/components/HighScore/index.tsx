export default function HighScore() {
  const highscoresData = JSON.parse(localStorage.getItem('highscores') || '[]') as { name: string; moves: number }[];
  const sortedHighscores = highscoresData.sort((a, b) => a.moves - b.moves).slice(0, 10);
  return (
    <div className="highscore-list">
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
              <td className=" highscore-moves">{list.moves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
