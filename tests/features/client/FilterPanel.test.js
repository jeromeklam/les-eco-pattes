import React from 'react';
import { shallow } from 'enzyme';
import { FilterPanel } from '../../../src/features/client';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterPanel />);
  expect(renderedComponent.find('.client-filter-panel').length).toBe(1);
});
