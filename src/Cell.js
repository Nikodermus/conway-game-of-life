import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Cell extends Component {
  static propTypes = {
    alive: PropTypes.bool.isRequired,
    className: PropTypes.string
  }

  render() {
    return (
      <div
        className={`cell ${this.props.className} ${this.props.alive ? 'cell--alive' : ''}`}>

      </div>
    )
  }
}
