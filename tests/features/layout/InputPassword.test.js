import React from 'react';
import { shallow } from 'enzyme';
import { InputPassword } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPassword />);
  expect(renderedComponent.find('.layout-input-password').length).toBe(1);
});
