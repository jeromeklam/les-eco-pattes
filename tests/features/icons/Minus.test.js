import React from 'react';
import { shallow } from 'enzyme';
import { Minus } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Minus />);
  expect(renderedComponent.find('.icons-minus').length).toBe(1);
});
