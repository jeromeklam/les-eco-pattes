import React from 'react';
import { shallow } from 'enzyme';
import { Movement } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Movement />);
  expect(renderedComponent.find('.icons-movement').length).toBe(1);
});
