import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme'

it('renders children if no error happened', () => {
  const tree = renderer.create(
    <ErrorBoundary>
      <div>a child component</div>
    </ErrorBoundary>
  );
  expect(tree).toMatchSnapshot();
});

it('renders an error if an error happens', () => {
  expect.assertions(3);

  // ErrorBoundary logs an error also in tests, suppress those
  // so devs aren't confused when seeing such an error but the test itself passing.
  // See: https://github.com/facebook/react/issues/11098 -- as of react 16.4.3+ this
  // is avoidable, but that version is not out yet.
  spyOn(console, 'error');

  const ErroringComponent = () => {
    throw new Error('an Error')
  }
  const wrapper = mount(
    <ErrorBoundary>
      <ErroringComponent />
    </ErrorBoundary>
  );

  expect(wrapper.state('error')).not.toBe(null)
  expect(wrapper.state('errorInfo')).not.toBe(null)
  expect(wrapper.find('details').length).toBe(1);
})