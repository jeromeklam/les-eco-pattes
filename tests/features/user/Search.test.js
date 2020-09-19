import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/user';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.user-search').length).toBe(1);
});
