import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Cell extends Component {
  static propTypes = {
    alive: PropTypes.bool.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    return (
      <div
        className={`cell ${this.props.className} ${this.props.alive ? 'cell--alive' : ''}`}>
      </div>
    )
  }
}
