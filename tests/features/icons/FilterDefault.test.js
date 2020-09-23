import React from 'react';
import { shallow } from 'enzyme';
import { FilterDefault } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterDefault />);
  expect(renderedComponent.find('.icons-filter-default').length).toBe(1);
});
