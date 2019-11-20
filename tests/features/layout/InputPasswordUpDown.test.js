import React from 'react';
import { shallow } from 'enzyme';
import { InputPasswordUpDown } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPasswordUpDown />);
  expect(renderedComponent.find('.layout-input-password-up-down').length).toBe(1);
});
