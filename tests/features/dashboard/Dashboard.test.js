import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/dashboard';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dashboard />);
  expect(renderedComponent.find('.dashboard-dashboard').length).toBe(1);
});
