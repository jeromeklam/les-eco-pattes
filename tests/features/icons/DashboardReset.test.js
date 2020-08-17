import React from 'react';
import { shallow } from 'enzyme';
import { DashboardReset } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DashboardReset />);
  expect(renderedComponent.find('.icons-dashboard-reset').length).toBe(1);
});
