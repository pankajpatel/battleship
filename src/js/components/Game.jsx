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
  prepareLogMessage(index){
    let log = this.props.data.logs[index];
    if(log != undefined){
      let message = [];
      message.push(''+this.props.data.players[log.player].name)
      message.push('('+ (log.cell.r + 1) +', '+ (log.cell.c + 1) + ')' )
      message.push('' + log.info.message.join(', ') )
      return message.join(' & ')
    } else {
      return '';
    }
  },
  render() {

    return (
      <div className="container">
        <h1>Battleships</h1>
        <p></p>
        <div className="two-columns clearfix">
          <div className="column">
            <h2>{this.props.data.winner != null ? this.props.data.players[this.props.data.winner].name + ' won!' : ''}</h2>
            <p><strong>Turn: </strong><span>{this.props.data.players[this.props.data.turn].name}</span></p>
          </div>
          <div className="column">
            <p><strong>Last Move: </strong><br/>
            <span>{this.prepareLogMessage(this.props.data.logs.length - 1)}</span></p>
            <p><strong>Second Last Move: </strong><br/>
            <span>{this.prepareLogMessage(this.props.data.logs.length - 2)}</span></p>
          </div>
        </div>
        <div className="two-columns">
          {
            this.props.data.players.map( (player, i) => {
              return (
                  <div className="column" key={i}>
                    <Arena turn={this.props.data.turn == i} winner={this.props.data.winner == null ? null : this.props.data.winner === i } player={player} ref={'player'+player.id} />
                  </div>
                )
            })
          }
        </div>
      </div>
    );
  }
});
