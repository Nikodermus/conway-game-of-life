import React, { Component } from 'react';

import Cell from './Cell';

import './App.css';

class App extends Component {
  state = {
    grid: [],
    generation: 0
  }

  componentWillMount() {
    this.addGrid(50, {
      alive: false,
      className: 'grid-elem',
    });
  }

  componentDidMount() {
    this.setInitial()
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

  setInitial = () => {
    let { grid } = this.state;
    grid[0][0] = true;
    grid[0][1] = true;
    grid[1][0] = true;
    grid[1][3] = true;
    grid[2][1] = true;
    grid[2][2] = true;
    this.setState({ grid });
    this.checkGrid();
  }

  checkGrid = () => {
    let { grid, generation } = this.state;
    let alive_pop = 0;
    grid.map((row, i) => {
      row.map((elem, j) => {
        let { alive_n, dead_n } = this.checkNeighbors(i, j);

        // TODO: Wait for all info to be collected before making generation change
        setTimeout(() => {
          if (grid[i][j] && alive_n === 2 || alive_n === 3) {
            grid[i][j] = true;
          } else {
            grid[i][j] = false;
          }
        }, 0)
      });
    });

    generation += 1;
    this.setState({ grid, generation });

    // TODO: Set exit condition for no alive population
    if (generation < 50) {
      setTimeout(() => {
        this.checkGrid()
      }, 2000);
    }
  }

  checkNeighbors = (i, j) => {
    let { grid } = this.state;
    let alive_n = 0;
    let dead_n = 0;

    let move = [-1, 0, +1];

    move.map(change_row => {
      move.map(change_col => {
        if (
          // Inside the grid
          i + change_row > 0 &&
          i + change_row < grid.length - 1 &&
          j + change_col > 0 &&
          j + change_col < grid.length - 1 &&

          // Not count the point we are checking
          (j + change_col !== j && i + change_row !== i)
        ) {
          // Sum dead and alive around
          grid[i + change_row][j + change_col] ? alive_n += 1 : dead_n += 1;
        }
      });
    });

    return {
      alive_n,
      dead_n
    }
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
