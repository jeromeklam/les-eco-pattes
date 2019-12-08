import React from 'react';
import { shallow } from 'enzyme';
import { MapMove } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapMove />);
  expect(renderedComponent.find('.icons-map-move').length).toBe(1);
});
