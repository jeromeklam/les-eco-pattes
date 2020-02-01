import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dashboard />);
  expect(renderedComponent.find('.icons-dashboard').length).toBe(1);
});
