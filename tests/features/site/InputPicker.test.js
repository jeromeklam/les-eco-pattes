import React from 'react';
import { shallow } from 'enzyme';
import { InputPicker } from '../../../src/features/site';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPicker />);
  expect(renderedComponent.find('.site-input-picker').length).toBe(1);
});
