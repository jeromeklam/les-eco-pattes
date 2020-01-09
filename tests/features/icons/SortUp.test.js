import React from 'react';
import { shallow } from 'enzyme';
import { SortUp } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SortUp />);
  expect(renderedComponent.find('.icons-sort-up').length).toBe(1);
});
