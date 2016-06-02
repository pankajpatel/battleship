import React from 'react';
import ActionCreator from '../actions/GameActionCreators';


export default React.createClass({
  getDefaultProps() {
      return {
        player: {
          arena: Array(10).fill({
                cells: Array(10).fill({
                  name: null
                })
              })
        }
      };
  },

  handleClick(pId, cell, e){
    console.log(pId, cell, e.target)
    ActionCreator.markCell({
        player: pId,
        cell
      });
  },


  componentWillMount: function(){
      this.weapons = null;
  },

  render() {
    console.log(this.props)
    return (
      <div className="arena">
        <p>{this.props.player.name}</p>
        {
          this.props.player.arena.map( (row, r) => {
            return (
                <ul className="row" key={r}>
                  {
                    row.cells.map( (cell, c) => {

                      let classNames = ['cell'];

                      if( this.props.player.name == 'You' && cell.isWeaponized ){
                        classNames.push( 'weaponized' );
                      }

                      if(cell.value === 1){
                        classNames.push('done');
                        // classNames.push('miss');
                      }
                      return (
                          <li
                            className={classNames.join(' ')}
                            ref={r+','+c} key={c}
                            data-weapon={cell.weapon}
                            onClick={this.handleClick.bind(this, this.props.player.id, {r, c})} ></li>
                        )
                    })
                  }
                </ul>
              )
          })
        }
      </div>
    );
  }
});
