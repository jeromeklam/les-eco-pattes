import React from 'react';
import { shallow } from 'enzyme';
import { MapCenter } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapCenter />);
  expect(renderedComponent.find('.icons-map-center').length).toBe(1);
});
