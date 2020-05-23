import React from 'react';
import { shallow } from 'enzyme';
import { MenuClosed } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MenuClosed />);
  expect(renderedComponent.find('.icons-menu-closed').length).toBe(1);
});
