var game = {
  arena:{
    rows: 10,
    columns: 10
  },
  weapons: {
    battleship: {
      name: 'Battleship',
      squares: 5,
      allowed: 1
    },
    destroyer: {
      name: 'Destroyer',
      squares: 4,
      allowed: 2
    }
  },
  players: [
    {
      id: 1,
      type: 'human',
      name: 'You',
      arena: [], //will be filled by constructor
      weaponsIn: null,
      weapons: [
        {
          type: 'battleship',
          cells: [{r: 0, c: 0},{r: 0, c: 1},{r: 0, c: 2},{r: 0, c: 3},{r: 0, c: 4}],
          status: 1 //active
        }, {
          type: 'destroyer',
          cells: [{r: 1, c: 0},{r: 1, c: 1},{r: 1, c: 2},{r: 1, c: 3}],
          status: 1 //active
        }, {
          type: 'destroyer',
          cells: [{r: 2, c: 0},{r: 2, c: 1},{r: 2, c: 2},{r: 2, c: 3}],
          status: 1 //active
        }
      ]
    }, {
      id: 2,
      type: 'bot',
      name: 'Computer',
      arena: [], //will be filled by constructor
      weapons: [
        {
          type: 'battleship',
          cells: [{r: 0, c: 0},{r: 0, c: 1},{r: 0, c: 2},{r: 0, c: 3},{r: 0, c: 4}],
          status: 1 //active
        }, {
          type: 'destroyer',
          cells: [{r: 1, c: 0},{r: 1, c: 1},{r: 1, c: 2},{r: 1, c: 3}],
          status: 1 //active
        }, {
          type: 'destroyer',
          cells: [{r: 2, c: 0},{r: 2, c: 1},{r: 2, c: 2},{r: 2, c: 3}],
          status: 1 //active
        }
      ]

    }
  ]
}

export default game;
