import React from 'react';
import { shallow } from 'enzyme';
import { FilterPanel } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterPanel />);
  expect(renderedComponent.find('.cause-filter-panel').length).toBe(1);
});
