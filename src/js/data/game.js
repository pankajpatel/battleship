import gameData from './gameData.js';

class Game {
  constructor(){
    this.data = gameData;
    this.init();
  }
  init(){
    this.data.players.forEach( (player, i) => {
      //weapons array
      if( player.weaponsIn == null ){
        let w = [];
        player.weapons.map( (weapon, i) => {
          w = w.concat(weapon.cells.map(cell => {
            cell.weapon = i;
            return cell;
          }));
        })
        player.weaponsIn = w
      }

      //this loop filling is done to prevent mutation
      player.arena = [];
      for( var i = 0; i < this.data.arena.rows; i++ ){
        let row = [];
        for( var j = 0; j < this.data.arena.columns; j++ ){
          let isWeaponized = this.isWeaponized(player, i, j);

          row.push(Object.assign({}, {
            name: null,
            value: 0,
            r: i,
            c: j,
            isWeaponized: isWeaponized.length,
            weapon: isWeaponized.length ? isWeaponized[0].weapon : ''
          }))
        }
        player.arena.push( {cells: row} );
      }
    })
  }

  isWeaponized(player, r, c){
    let found = [];
    found = player.weaponsIn.filter( weapon => {
      return r == weapon.r && c == weapon.c;
    });
    return found;
  }
  getState(){
    return this.data;
  }
  getPlayer( pID ){
    let playerId = null;
    this.data.players.map( (player, i) => {
      if( player.id == pID ){
        playerId = i;
      }
    })
    return playerId
  }
  markCell( data, callback ){
    let index = this.getPlayer(data.player);
    let cell = this.data.players[index].arena[data.cell.r].cells[data.cell.c]
    cell.value = 1;
    callback();
  }
}

export default Game
