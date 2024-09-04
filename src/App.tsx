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


export default App;
