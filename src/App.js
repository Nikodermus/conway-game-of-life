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
    });
  }

  createGrid = (num = 100) => {
    // Fill grid with false rows and columns
    let { grid } = this.state;
    for (let i = 0; i < num; i += 1) {
      grid.push([]);
      for (let j = 0; j < num; j += 1) {
        grid[i].push(false);
      }
    }

    // Add initial true cells
    this.setInitial();

    // After a couple seconds, start evolving
    setTimeout(() => {
      this.checkGrid()
    }, 1000);
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
    let future_grid = [...grid];
    grid.map((row, i) => {
      row.map((col, j) => {
        let { alive_n } = this.checkNeighbors(i, j);

        if (
          alive_n === 3 ||
          (grid[i][j] && alive_n === 2)
        ) {
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
      }, 1000);
    }
  }

  checkNeighbors = (i, j) => {
    let { grid } = this.state;
    let alive_n = 0;
    let dead_n = 0;

    for (let row = i - 1; row <= i + 1; row += 1) {
      for (let col = j - 1; col <= j + 1; col += 1) {
        if (
          // Inside the grid
          row >= 0 &&
          row < grid.length &&
          col >= 0 &&
          col < grid.length &&
          // Not count the point we are checking
          (row !== i || col !== j)
        ) {
          // Sum dead and alive around
          grid[row][col] ? alive_n += 1 : dead_n += 1;
        }
      }
    }

    return { alive_n, dead_n }
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
