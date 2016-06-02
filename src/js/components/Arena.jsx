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
    ActionCreator.markCell({
        player: pId,
        cell
      });
  },

  render() {
    return (
      <div className={this.props.turn ? 'arena' : 'arena turn'}>
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
                        if(cell.isWeaponized){
                          classNames.push('hit');
                        } else {
                          classNames.push('miss');
                        }
                      }
                      if( this.props.turn || cell.value === 1 ){
                        return (
                            <li
                              className={classNames.join(' ')}
                              ref={r+','+c} key={c}
                              data-weapon={cell.weapon} ></li>
                          )
                      } else {
                        classNames.push( 'clickable' );
                        return (
                            <li
                              className={classNames.join(' ')}
                              ref={r+','+c} key={c}
                              data-weapon={cell.weapon}
                              onClick={this.handleClick.bind(this, this.props.player.id, {r, c})} ></li>
                          )
                      }
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
