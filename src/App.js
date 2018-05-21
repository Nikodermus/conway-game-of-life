import React, { Component } from 'react';

import Cell from './Cell';

import './App.css';

class App extends Component {
  state = {
    grid: [],
    generation: 0,
  }

  componentWillMount() {
    this.createGrid(50, {
      alive: false,
      className: 'grid-elem',
    });
  }

  createGrid = (num = 100, props = {}) => {

    // Fill grid with false rows and columns
    let { grid } = this.state;
    for (let i = 0; i < num; i++) {
      grid.push([]);
      for (let j = 0; j < num; j++) {
        grid[i].push(false);
      }
    }
    // Add initial true cells
    grid = this.setInitial(grid);
    this.setState({ grid });

    // After a couple seconds, start evolving
    setTimeout(() => {
      this.checkGrid()
    }, 10);
  }

  setInitial = (grid) => {

    grid[0][0] = true;
    grid[0][1] = true;
    grid[1][0] = true;
    grid[1][3] = true;
    grid[2][1] = true;
    grid[2][2] = true;
    return grid;
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
    });
  }

  checkGrid = () => {

    let { grid, generation } = this.state;
    let alive_pop = 0;
    let future_grid = [...grid];
    grid.map((row, i) => {
      row.map((elem, j) => {
        let { alive_n, dead_n } = this.checkNeighbors(i, j);

        // TODO: Wait for all info to be collected before making generation change
        if ((grid[i][j] && alive_n === 2) || alive_n === 3) {
          future_grid[i][j] = true;
        } else {
          future_grid[i][j] = false;
        }

      });
    });

    generation += 1;

    this.setState({
      generation,
      grid: future_grid
    });

    // TODO: Set exit condition for no alive population
    if (generation < 50) {
      setTimeout(() => {
        this.checkGrid()
      }, 10);
    }
  }

  checkNeighbors = (i, j) => {

    let { grid } = this.state;
    let alive_n = 0;
    let dead_n = 0;

    for (let row = i - 1; row <= i + 1; row++) {
      for (let col = j - 1; col <= j + 1; col++) {
        if (
          // Inside the grid
          row >= 0 &&
          row < grid.length &&
          col >= 0 &&
          col < grid.length &&
          // Not count the point we are checking
          (row !== j || col !== i)
        ) {
          // Sum dead and alive around
          grid[row][col] ? alive_n += 1 : dead_n += 1;
        }
      }
    }

    // debugger

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
