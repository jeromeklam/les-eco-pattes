import React from 'react';
import { shallow } from 'enzyme';
import { FilterFull } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterFull />);
  expect(renderedComponent.find('.icons-filter-full').length).toBe(1);
});
