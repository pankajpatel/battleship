import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
import BaseStore from './BaseStore';
import Game from '../data/game.js';

// data storage
let _game = new Game();


// Facebook style store creation.
const TodoStore = Object.assign({}, BaseStore, {
  // public methods used by Controller-View to operate on data
  getAll() {
    console.log(_game)
    return {
      game: _game.getState()
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: Dispatcher.register(function handleAction(payload) {
    const action = payload.action;

    switch (action.type) {

    case Constants.ActionTypes.MOVED:
      _game;
      break;

    case Constants.ActionTypes.ROTATED:
      _game;
      break;

    case Constants.ActionTypes.CELL_SELECTED:
      _game;
      break;
    }
  })
});

export default TodoStore;
