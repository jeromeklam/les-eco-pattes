import React from 'react';
import { shallow } from 'enzyme';
import { Zoom } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Zoom />);
  expect(renderedComponent.find('.icons-zoom').length).toBe(1);
});
