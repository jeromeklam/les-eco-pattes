import React from 'react';
import { shallow } from 'enzyme';
import { Camera } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Camera />);
  expect(renderedComponent.find('.icons-camera').length).toBe(1);
});
