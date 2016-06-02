import React, {PropTypes} from 'react';
import Arena from './Arena.jsx';


export default React.createClass({
  propTypes: {
    data: PropTypes.any.isRequired
  },

  render() {
    return (
      <div className="container">
        <h1>Battleships</h1>
        <p></p>
        <div className="two-columns">
          {
            this.props.data.players.map( (player, i) => {
              return (
                  <div className="column" key={i}>
                    <Arena player={player} ref={'player'+player.id} />
                  </div>
                )
            })
          }
        </div>
      </div>
    );
  }
});
