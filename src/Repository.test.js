import React from 'react';
import ReactDOM from 'react-dom';
import Repository from './Repository';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const props = {
    name: 'test-repo',
    index: 0,
    onClick: jest.fn()
  };

  const tree = renderer.create(
    <Repository {...props} />
  );
  expect(tree).toMatchSnapshot();
});
