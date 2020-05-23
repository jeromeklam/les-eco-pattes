import React from 'react';
import { shallow } from 'enzyme';
import { MapPose } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MapPose />);
  expect(renderedComponent.find('.icons-map-pose').length).toBe(1);
});
