import React, {PropTypes} from 'react';
import Arena from './Arena.jsx';
import ActionCreator from '../actions/GameActionCreators';

export default React.createClass({
  propTypes: {
    data: PropTypes.any.isRequired
  },

  makeComputerMove(){
    ActionCreator.makeComputerMove();
  },
  componentDidUpdate(){
    if(this.props.data.turn == 1){//it iss bot's turn now
      this.makeComputerMove();
    }
  },
  render() {

    return (
      <div className="container">
        <h1>Battleships</h1>
        <p></p>
        <div className="three-columns clearfix">
          <div className="column">
            <p><label>Turn: </label><span>{this.props.data.players[this.props.data.turn].name}</span></p>
          </div>
        </div>
        <div className="two-columns">
          {
            this.props.data.players.map( (player, i) => {
              return (
                  <div className="column" key={i}>
                    <Arena turn={this.props.data.turn == i} player={player} ref={'player'+player.id} />
                  </div>
                )
            })
          }
        </div>
      </div>
    );
  }
});
