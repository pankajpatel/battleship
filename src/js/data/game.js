import gameData from './gameData.js';

class Game {
  constructor(){
    this.data = gameData;
  }
  getState(){
    return this.data;
  }
}

export default Game
