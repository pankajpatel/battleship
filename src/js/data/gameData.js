var game = {
  arena:{
    rows: 10,
    columns: 10
  },
  weapons: [
    {
      name: 'Battleship',
      squares: 5,
      allowed: 1
    }, {
      name: 'Destroyer',
      squares: 4,
      allowed: 2
    }
  ],
  players: [
    {
      id: 1,
      type: 'human',
      name: 'You',
      arena: [],
      weaponsIn: null,
      weapons: [
        {
          name: 'Battleship',
          cells: [{r: 0, c: 0},{r: 0, c: 1},{r: 0, c: 2},{r: 0, c: 3},{r: 0, c: 4}],
          status: 1
        }, {
          name: 'Destroyer',
          cells: [{r: 1, c: 0},{r: 1, c: 1},{r: 1, c: 2},{r: 1, c: 3}],
          status: 1
        }, {
          name: 'Destroyer',
          cells: [{r: 2, c: 0},{r: 2, c: 1},{r: 2, c: 2},{r: 2, c: 3}],
          status: 1
        }
      ]
    }, {
      id: 2,
      type: 'bot',
      name: 'Computer',
      arena: [],
      weapons: [
        {
          name: 'Battleship',
          cells: [{r: 0, c: 0},{r: 0, c: 1},{r: 0, c: 2},{r: 0, c: 3},{r: 0, c: 4}],
          status: 1
        }, {
          name: 'Destroyer',
          cells: [{r: 1, c: 0},{r: 1, c: 1},{r: 1, c: 2},{r: 1, c: 3}],
          status: 1
        }, {
          name: 'Destroyer',
          cells: [{r: 2, c: 0},{r: 2, c: 1},{r: 2, c: 2},{r: 2, c: 3}],
          status: 1
        }
      ]

    }
  ]
}

export default game;
