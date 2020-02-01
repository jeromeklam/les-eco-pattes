import React from 'react';
import { shallow } from 'enzyme';
import { StatCard } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<StatCard />);
  expect(renderedComponent.find('.ui-stat-card').length).toBe(1);
});
