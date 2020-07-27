import React from 'react';
import { shallow } from 'enzyme';
import { Wait } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Wait />);
  expect(renderedComponent.find('.icons-wait').length).toBe(1);
});
