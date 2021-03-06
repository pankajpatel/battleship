import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import Game from '../data/game.js';

// data storage
let _game = new Game();

// Facebook style store creation.
const GameStore = Object.assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      game: _game.getState()
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;
    const data = action.data;

    switch (action.type) {

    case Constants.ActionTypes.MOVED:
      //@todo
      _game;
      break;

    case Constants.ActionTypes.ROTATED:
      //@todo
      _game;
      break;

    case Constants.ActionTypes.CELL_SELECTED:
      _game.markCell(data, () => {
        GameStore.emitChange();
      })
      break;

    case Constants.ActionTypes.BOT_MOVED:
      _game.makeComputerMove(() => {
        GameStore.emitChange();
      })
      break;
    }
  })
});

export default GameStore;
