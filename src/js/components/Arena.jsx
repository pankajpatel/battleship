import React from 'react';

export default React.createClass({
  getDefaultProps() {
      return {
          arena: Array(10).fill({
            cells: Array(10).fill({
              name: null
            })
          })
      };
  },
  render() {
    console.log(this.props.arena)
    return (
      <div className="arena">
        {
          this.props.arena.map( (row, index) => {
            return (
                <ul className="row" key={index}>
                  {
                    row.cells.map( (cell, i) => {
                      return (
                          <li className="cell" key={i}></li>
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
