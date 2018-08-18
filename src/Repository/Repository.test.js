import React from 'react';
import Repository from './Repository';
import renderer from 'react-test-renderer';

it('renders with minimal props', () => {
  const props = {
    name: 'test-repo',
    index: 0,
    onClick: jest.fn()
  };

  const tree = renderer.create(<Repository {...props} />);
  expect(tree).toMatchSnapshot();
});

it('renders while loading', () => {
  const props = {
    name: 'test-repo',
    index: 0,
    onClick: jest.fn(),
    active: true,
    loading: true
  };

  const tree = renderer.create(<Repository {...props} />);
  expect(tree).toMatchSnapshot();
});

it('renders with a list of issues', () => {
  const props = {
    name: 'test-repo',
    index: 0,
    onClick: jest.fn(),
    active: true,
    loading: false,
    issues: [
      {
        id: 1,
        title: 'testissue1',
        html_url: 'https://example.org/testissue1'
      },
      {
        id: 2,
        title: 'testissue2',
        html_url: 'https://example.org/testissue2'
      }
    ]
  };

  const tree = renderer.create(<Repository {...props} />);
  expect(tree).toMatchSnapshot();
});

it('does not render the issues if active is false', () => {
  const props = {
    name: 'test-repo',
    index: 0,
    onClick: jest.fn(),
    active: false,
    loading: false,
    issues: [
      {
        id: 1,
        title: 'testissue1',
        html_url: 'https://example.org/testissue1'
      },
      {
        id: 2,
        title: 'testissue2',
        html_url: 'https://example.org/testissue2'
      }
    ]
  };

  const tree = renderer.create(<Repository {...props} />);
  expect(tree).toMatchSnapshot();
});
