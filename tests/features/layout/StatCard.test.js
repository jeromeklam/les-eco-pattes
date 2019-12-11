import React from 'react';
import { shallow } from 'enzyme';
import { StatCard } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<StatCard />);
  expect(renderedComponent.find('.layout-stat-card').length).toBe(1);
});
