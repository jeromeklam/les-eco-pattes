import React from 'react';
import { shallow } from 'enzyme';
import { MultiInputPicker } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MultiInputPicker />);
  expect(renderedComponent.find('.cause-multi-input-picker').length).toBe(1);
});
