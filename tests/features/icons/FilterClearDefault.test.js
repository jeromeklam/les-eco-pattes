import React from 'react';
import { shallow } from 'enzyme';
import { FilterClearDefault } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterClearDefault />);
  expect(renderedComponent.find('.icons-filter-clear-default').length).toBe(1);
});
