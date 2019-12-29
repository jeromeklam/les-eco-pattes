import React from 'react';
import { shallow } from 'enzyme';
import { Next } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Next />);
  expect(renderedComponent.find('.icons-next').length).toBe(1);
});
