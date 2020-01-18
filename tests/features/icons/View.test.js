import React from 'react';
import { shallow } from 'enzyme';
import { View } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<View />);
  expect(renderedComponent.find('.icons-view').length).toBe(1);
});
