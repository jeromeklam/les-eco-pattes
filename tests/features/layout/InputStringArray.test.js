import React from 'react';
import { shallow } from 'enzyme';
import { InputStringArray } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputStringArray />);
  expect(renderedComponent.find('.layout-input-string-array').length).toBe(1);
});
