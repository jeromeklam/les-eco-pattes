import React from 'react';
import { shallow } from 'enzyme';
import { SortDown } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SortDown />);
  expect(renderedComponent.find('.icons-sort-down').length).toBe(1);
});
