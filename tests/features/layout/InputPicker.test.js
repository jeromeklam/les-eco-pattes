import React from 'react';
import { shallow } from 'enzyme';
import { InputPicker } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPicker />);
  expect(renderedComponent.find('.layout-input-picker').length).toBe(1);
});
