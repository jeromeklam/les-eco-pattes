import React from 'react';
import { shallow } from 'enzyme';
import { InputHidden } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputHidden />);
  expect(renderedComponent.find('.layout-input-hidden').length).toBe(1);
});
