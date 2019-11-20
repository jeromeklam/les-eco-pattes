import React from 'react';
import { shallow } from 'enzyme';
import { InputEmailUpDown } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputEmailUpDown />);
  expect(renderedComponent.find('.layout-input-email-up-down').length).toBe(1);
});
