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
    this.data.players.forEach( (player, playerIndex) => {
      //random
      this.randomizeWeapons(player);


      //weapons array
      if( player.weaponsIn == null ){
        let w = [];
        player.weapons.forEach( (weapon, weaponIndex) => {
          weapon.cells.forEach(cell => {
            cell.weapon = weaponIndex;
          });
          w = w.concat(weapon.cells)
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
        } else { //increase in r
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
  getPlayer( playerId ){
    let playerIndex = null;
    this.data.players.map( (player, i) => {
      if( player.id == playerId ){
        playerIndex = i;
      }
    })
    return playerIndex
  }
  markCell( data, callback ){
    let index = this.getPlayer(data.player);
    let cell = this.data.players[index].arena[data.cell.r].cells[data.cell.c]
    cell.value = 1;
    this
      .pushLog(this.data.turn, Object.assign({}, data.cell), {
          message: [
              cell.isWeaponized ? 'hit' : 'miss',
              this.isWeaponDestroyed(index, cell.weapon) ? 'ship sinked' : ''
            ]
        })
      .checkForWinner()
      .nextTurn(callback);
  }
  pushLog(player, cell, info){
    console.log(player, cell, info)
    this.data.logs.push({player, cell, info});
    return this;
  }
  nextTurn(callback){
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
  autoClick(playerIndex){
    let location = {r: null, c: null};
    location.r = this.randomValue(this.rows);
    location.c = this.randomValue(this.cols);
    if( this.data.players[playerIndex].arena[location.r].cells[location.c].value == 1){
      location = this.autoClick(playerIndex)
    }
    return location;
  }

  isWeaponDestroyed(playerIndex, weaponIndex){
    console.log('player: '+playerIndex, 'weapon: '+weaponIndex)
    if(weaponIndex != ''){
      let weapon = this.data.players[playerIndex].weapons[weaponIndex].cells;
      let totalPossibleDamage = weapon.length;
      let damage = 0;
      weapon.map( (cell, i) => {
        this.data.players[playerIndex].arena[cell.r].cells[cell.c].value == 1 ? damage++ : null;
      })
      if( damage < totalPossibleDamage ){
        return false;
      } else {
        this.data.players[playerIndex].weapons[weaponIndex].status = 0;
        return true;
      }
    }
    return false;
  }
  checkForWinner(){
    let winnerIndex = null;
    let powers = [];
    this.data.players.map((player, playerIndex) => {
      let playerPower = player.weapons.length;
      player.weapons.map( weapon => {
        if( !weapon.status ){
          playerPower--;
        }
      })
      powers.push({index: playerIndex, power: playerPower});
    })

    if(powers[0] == 0){
      winnerIndex = 1;
    } else if(powers[1] == 0){
      winnerIndex = 0;
    }
    this.data.winner = winnerIndex;
    return this;
  }
  makeComputerMove(callback){
    //pretend like computer is thinking
    // console.log('bot is moving')
    setTimeout(()=>{
      let cellToClick = this.autoClick(0);
      this.markCell({ player: this.data.players[0].id, cell: cellToClick }, callback)

    },100)

    // this.netxTurn(callback);

  }
}

export default Game
