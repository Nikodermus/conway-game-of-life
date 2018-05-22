import React from 'react';
import Cell from '../Cell';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';


let node, component;

beforeEach(function () {
  node = document.createElement('div');
  component = ReactDOM.render(<Cell alive={true} />, node);
});

it('Prop change, changes cell', function () {
  expect(component.props.alive).toBe(true);
  ReactDOM.render(<Cell alive={false} />, node);
  expect(component.props.alive).toBe(false);
  expect(ReactDOM.findDOMNode(component).className).toEqual('cell  ');
});

