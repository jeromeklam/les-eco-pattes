import React from 'react';
import { shallow } from 'enzyme';
import { InputCheckbox } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputCheckbox />);
  expect(renderedComponent.find('.layout-input-checkbox').length).toBe(1);
});
