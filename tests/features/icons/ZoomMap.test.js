import React from 'react';
import { shallow } from 'enzyme';
import { ZoomMap } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ZoomMap />);
  expect(renderedComponent.find('.icons-zoom-map').length).toBe(1);
});
