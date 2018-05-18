import React from 'react';
import App from '../App';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('snapshot', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})