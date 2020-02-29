import React from 'react';
import { shallow } from 'enzyme';
import { InputTextarea } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputTextarea />);
  expect(renderedComponent.find('.ui-input-textarea').length).toBe(1);
});
