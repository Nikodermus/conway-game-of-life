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

  /**
 * Create an empty 2D array matrix .
 * @param {number} num - Size of the matrix
 */
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

  /**
  * Add initial true values to a matrix .
  * @param {array} grid - 2D Array matrix
  */
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

  /**
  * Takes an array matrix and outputs a HTML
  * table grid .
  * @returns {HTMLElement} Grid of elements attached to an state
  */
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

  /**
  * Check each element of the grid should
  * continue living or die in next gen
  * @param {array} grid of elements attached to an state
  */
  checkGrid = (grid) => {
    let { generation } = this.state;
    let future_grid = copyArray(grid);
    let alive_pop = 0;
    let generation_alive = [];

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

        if (grid[i][j]) {
          alive_pop += 1;
          generation_alive.push(i, j);
        };
      });
    });

    // TODO: Compare that population has stabilized
    // with periocity up to 4
    const is_stable = this.compareGenerations(generation_alive);

    generation += 1;

    this.setState({
      generation,
      grid: future_grid
    });

    // TODO: Set exit condition for stable population
    if (
      generation < 50 &&
      alive_pop &&
      !is_stable
    ) {
      setTimeout(() => {
        this.checkGrid(future_grid)
      }, 1000);
    }
  }


  /**
  * Check for periocity or stable generations
  * @param {array} grid - Grid with alive only that will be added to the stack
  * @returns {boolean} - If the population has stabilized
  */
  compareGenerations = (grid) => {
    // WIP: Check stable and periocity
    let { generation_record } = this.state;

    if (generation_record.length >= 5) {
      generation_record.shift()
    }

    generation_record.push(grid);
    this.setState({ generation_record });

    if (generation_record.length > 1) {
      return compareArray(generation_record[0], generation_record[generation_record.length - 1])
    }
    return false;
  }

  /**
  * Count true elements around
  * a given point in a matrix
  * @param {array} grid - Grid that will be checked
  * @param {number} i - Y Position in the matrix
  * @param {number} j - X Position in the matrix
  * @returns {object} Neighbors- Dead and alive neighbors
  *
  */
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


    /**
     * @typedef {Object} Neighbors
     * @property {number} dead_n - Falsy neighbors
     * @property {number} alive_n - Truthy neighbors
    */
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
