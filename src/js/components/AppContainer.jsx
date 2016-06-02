import React from 'react';
import GameStore from '../stores/GameStore';
import ActionCreator from '../actions/GameActionCreators';
import Game from './Game.jsx';

export default React.createClass({
  _onChange() {
    this.setState(GameStore.getAll());
  },

  getInitialState() {
    return GameStore.getAll();
  },

  componentDidMount() {
    GameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    GameStore.removeChangeListener(this._onChange);
  },

  render() {
    let {game} = this.state;
    return (
      <Game data={game} />
    );
  }
});
