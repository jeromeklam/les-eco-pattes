import React from 'react';
import { shallow } from 'enzyme';
import { Medical } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Medical />);
  expect(renderedComponent.find('.icons-medical').length).toBe(1);
});
