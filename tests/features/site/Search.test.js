import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/site';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.site-search').length).toBe(1);
});
