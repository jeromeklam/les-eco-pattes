import React from 'react';
import { shallow } from 'enzyme';
import { Cause } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Cause />);
  expect(renderedComponent.find('.icons-cause').length).toBe(1);
});
