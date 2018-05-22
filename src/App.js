import React, { Component } from 'react';

import Cell from './Cell';

import { copyArray, compareArray } from './helpers/copycat';

import './App.css';

class App extends Component {
  state = {
    grid: [],
    generation: 0,
    generation_record: []
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
    this.setInitial(grid);
  }

  setInitial = (grid) => {
    grid[0][0] = true;
    grid[0][1] = true;
    grid[1][0] = true;
    grid[1][3] = true;
    grid[1][3] = true;
    grid[2][1] = true;
    grid[2][2] = true;

    setTimeout(() => {
      this.checkGrid(grid);
    }, 1000);
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

  componentDidMount() {
  }

  checkGrid = (grid) => {
    let { generation } = this.state;
    let future_grid = copyArray(grid);
    let alive_pop = 0;

    grid.map((row, i) => {
      row.map((col, j) => {
        let { alive_n } = this.checkNeighbors(grid, i, j);

        if (
          alive_n === 3 ||
          (grid[i][j] && alive_n === 2)
        ) {
          future_grid[i][j] = true;
        } else {
          future_grid[i][j] = false;
        }

        grid[i][j] ? alive_pop += 1 : null;
      });
    });

    // TODO: Compare that population has stabilized
    // to use it as an exit condition
    // const is_stable = this.compareGenerations(grid);

    generation += 1;

    this.setState({
      generation,
      grid: future_grid
    });

    // TODO: Set exit condition for stable population
    if (generation < 50 && alive_pop) {
      setTimeout(() => {
        this.checkGrid(future_grid)
      }, 1000);
    }
  }

  compareGenerations = (grid) => {
    let { generation_record } = this.state;
    if (generation_record.length >= 5) {
      generation_record.shift()
    }

    generation_record.push(grid);
    this.setState({ generation_record });

    if (generation_record.length > 1) {
      return compareArray(generation_record[0], generation_record[generation_record.length])
    }
    return false;
  }

  checkNeighbors = (grid, i, j) => {
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
