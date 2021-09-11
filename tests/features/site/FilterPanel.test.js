import React from 'react';
import { shallow } from 'enzyme';
import { FilterPanel } from '../../../src/features/site';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterPanel />);
  expect(renderedComponent.find('.site-filter-panel').length).toBe(1);
});
