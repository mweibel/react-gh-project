import React from 'react';
import Repositories from './Repositories';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import Repository from '../Repository/Repository'
import { flushPromises } from '../testutils'


it('renders with minimal props', () => {
  const props = {
    organization: 'testorg'
  };

  const tree = renderer.create(
    <Repositories {...props} />
  );
  expect(tree).toMatchSnapshot();
});

it('loads available repos on mount', async () => {
  expect.assertions(3);
  const props = {
    organization: 'testorg',
  };

  const wrapper = shallow(
    <Repositories {...props} />
  );
  await flushPromises()

  expect(wrapper.state('loading')).toEqual(false);
  expect(wrapper.state('repos').length).toEqual(30);
  expect(wrapper.find(Repository).length).toEqual(30);
});

it('toggles and loads the issues when clicking on one repo', async () => {
  expect.assertions(5);
  const props = {
    organization: 'testorg',
  };

  const wrapper = shallow(
    <Repositories {...props} />
  );
  await flushPromises()

  const target = {}
  const event = { target, currentTarget: target, preventDefault: jest.fn() }
  const index = 0
  const name = 'testrepo'
  wrapper.find(Repository).first().simulate('click', event, index, name);

  let repo = wrapper.state('repos')[0]
  expect(repo.loading).toEqual(true);
  expect(repo.active).toEqual(true);

  await flushPromises();

  repo = wrapper.state('repos')[0]
  expect(repo.loading).toEqual(false);
  expect(repo.active).toEqual(true);
  expect(repo.issues.length).toEqual(30);
})