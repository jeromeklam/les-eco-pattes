import React from 'react';
import { shallow } from 'enzyme';
import { Male } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Male />);
  expect(renderedComponent.find('.icons-male').length).toBe(1);
});
