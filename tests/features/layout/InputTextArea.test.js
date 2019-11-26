import React from 'react';
import { shallow } from 'enzyme';
import { InputTextArea } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputTextArea />);
  expect(renderedComponent.find('.layout-input-text-area').length).toBe(1);
});
