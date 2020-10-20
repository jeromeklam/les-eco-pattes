import React from 'react';
import { shallow } from 'enzyme';
import { InputPassword } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPassword />);
  expect(renderedComponent.find('.ui-input-password').length).toBe(1);
});
