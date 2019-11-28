import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.icons-search').length).toBe(1);
});
