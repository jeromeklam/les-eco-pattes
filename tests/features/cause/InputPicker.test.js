import React from 'react';
import { shallow } from 'enzyme';
import { InputPicker } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPicker />);
  expect(renderedComponent.find('.cause-input-picker').length).toBe(1);
});
