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
