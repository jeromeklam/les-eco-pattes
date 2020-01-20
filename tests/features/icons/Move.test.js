import React from 'react';
import { shallow } from 'enzyme';
import { Move } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Move />);
  expect(renderedComponent.find('.icons-move').length).toBe(1);
});
