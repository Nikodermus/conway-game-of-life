import React, { Component } from 'react';

import Cell from './Cell';

import './App.css';

class App extends Component {
  state = {
    grid: []
  }

  componentWillMount() {
    this.addGrid(50, {
      alive: false,
      className: 'grid-elem',
    });
  }

  addGrid = (num = 100, props = {}) => {
    let { grid } = this.state;
    for (let i = 0; i < num; i++) {
      grid.push([]);
      for (let j = 0; j < num; j++) {
        grid[i].push(false);
      }
    }
    this.setState({ grid });
  }

  renderGrid = () => {
    return this.state.grid.map((elem, i) => {
      return (
        <div className="row" key={`row-${i}`}>
          {elem.map((bool, j) => {
            return (
              <Cell
                alive={bool}
                key={`${i}-${j}`}
                location={`${i}-${j}`} />)
          })}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        {this.renderGrid()}
      </div>
    );
  }
}

export default App;
