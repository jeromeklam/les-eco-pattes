import React from 'react';
import { shallow } from 'enzyme';
import { DashboardCard } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DashboardCard />);
  expect(renderedComponent.find('.dashboard-dashboard-card').length).toBe(1);
});
