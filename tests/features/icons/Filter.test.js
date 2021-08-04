import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Filter />);
  expect(renderedComponent.find('.icons-filter').length).toBe(1);
});
