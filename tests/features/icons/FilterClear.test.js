import React from 'react';
import { shallow } from 'enzyme';
import { FilterClear } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterClear />);
  expect(renderedComponent.find('.icons-filter-clear').length).toBe(1);
});
