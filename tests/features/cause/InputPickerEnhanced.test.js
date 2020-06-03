import React from 'react';
import { shallow } from 'enzyme';
import { InputPickerEnhanced } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputPickerEnhanced />);
  expect(renderedComponent.find('.cause-input-picker-enhanced').length).toBe(1);
});
