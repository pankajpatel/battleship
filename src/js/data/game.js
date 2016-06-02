import gameData from './gameData.js';

class Game {
  constructor(){
    this.data = gameData;
    this.data.logs = [];
    this.data.turn = 0;
    // this.data.turn = this.toss();
    this.init();

    // if( this.data.turn)
  }

  init(){
    this.data.players.forEach( (player, i) => {
      //random
      this.randomizeWeapons(player);


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
  randomValue(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }
  randomizeWeapons(player){
    const direction = ['h', 'v'] //h: horizontal, v: vertical
    if( typeof this.rows == 'undefined' ){ //DRY: dummy array for randoms generation
      let rows = Array(this.data.arena.rows).fill(0)
        rows = rows.map((e, i) => {
          e = i;
          return e;
        } )
      let cols = Array(this.data.arena.columns).fill(0)
        cols = cols.map((e, i) => {
          e = i;
          return e;
        } )
      this.rows = rows;
      this.cols = cols;
    }

    let rows = this.rows;
    let cols = this.cols;

    player.weapons.forEach( (weapon, index) => {
      var dir = this.randomValue( direction );
      var startX = this.randomValue( rows );
      var startY = this.randomValue( cols );
      let length = this.data.weapons[weapon.type].squares;
      if( dir == 'h' ){
        if(startY + length > cols.length){
          startY -= (startY+length - cols.length)
        }
      }

      if( dir == 'v' ){
        if(startX + length > rows.length){
          startX -= (startX+length - rows.length)
        }
      }

      weapon.cells = weapon.cells.map( i => {
        if( dir == 'h' ){ //increase in c
          return {r: startX, c: startY++}
        } else { //increase in h
          return {r: startX++, c: startY}
        } //in future diagonal can also be done
      })
      // console.log(dir, {x: startX, y: startY}, weapon.type, length)
      return player;
    } )
    return this;
  }
  toss(){
    const pIndex = [0, 1];
    return this.randomValue(pIndex);
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
    console.log('called markCell', index, data)
    let cell = this.data.players[index].arena[data.cell.r].cells[data.cell.c]
    cell.value = 1;
    this
      .pushLog(index, Object.assign({}, data.cell), {message: 'clicked'} )
      .netxTurn(callback);
  }
  pushLog(player, cell, info){
    console.log(player, cell, info)
    this.data.logs.push({player, cell, info});
    return this;
  }
  netxTurn(callback){
    this.data.turn++;

    if( this.data.turn > 1 ){
      this.data.turn = 0
    }
    callback();
    // if(this.data.players[this.data.turn].type == 'bot'){
    //   this.makeComputerMove(callback)
    // }
    return this;
  }
  autoClick(){
    let location = {r: null, c: null};
    location.r = this.randomValue(this.rows);
    location.c = this.randomValue(this.cols);
    return location;
  }
  makeComputerMove(callback){
    //pretend like computer is thinking
    console.log('bot is moving')
    setTimeout(()=>{
      let cellToClick = this.autoClick();
      console.log(cellToClick);
      this.markCell({ player: this.data.players[0].id, cell: cellToClick }, callback)

    },1000)

    // this.netxTurn(callback);

  }
}

export default Game
