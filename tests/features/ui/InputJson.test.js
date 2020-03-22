import React from 'react';
import { shallow } from 'enzyme';
import { InputJson } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputJson />);
  expect(renderedComponent.find('.ui-input-json').length).toBe(1);
});
