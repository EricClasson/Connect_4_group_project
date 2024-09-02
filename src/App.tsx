import "./App.css";
import BoardClass from "./classes/Board";
import { useState } from "react";

function App() {
  const [state, _setState] = useState({
    board: new BoardClass(() => setState()),
  });

  const setState = (prop: string = "", value: any = "") => {
    _setState({ ...state, [prop]: value });
  };

  if (state.board.checkForWin()) {
    alert("hej du vann");
  }
  console.log(state.board.checkForWin());

  return <>{state.board.render()}</>;
}

export default App;
