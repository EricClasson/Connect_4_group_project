import "./App.css";
import Board from "./classes/Board";

function App() {
    const board = new Board();
    return <>{board.render()}</>;
}

export default App;
