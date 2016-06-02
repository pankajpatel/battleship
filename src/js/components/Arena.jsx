import React from 'react';

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
  isWeaponized(r, c){
    if( this.weapons == null ){
      let w = [];
      this.props.player.weapons.map( weapon => {
        w = w.concat(weapon.cells);
      })
      this.weapons = w
    }
    let found = this.weapons.filter( weapon => {
      return r == weapon.r && c == weapon.c;
    });
    // console.log(this.weapons, found)
    return !!found.length;
  },
  componentWillMount: function(){
      this.weapons = null;
  },
  render() {
    console.log(this.isWeaponized(0, 0));
    console.log(this.props.player)
    return (
      <div className="arena">
        <p>{this.props.player.name}</p>
        {
          this.props.player.arena.map( (row, r) => {
            return (
                <ul className="row" key={r}>
                  {
                    row.cells.map( (cell, c) => {
                      let classNames = ['cell']
                      if( this.isWeaponized(r, c) ){
                        classNames.push( 'weaponized' );
                      }
                      return (
                          <li className={classNames.join(' ')} key={c}></li>
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
