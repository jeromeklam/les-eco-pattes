import React from 'react';
import { shallow } from 'enzyme';
import { MenuDown } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MenuDown />);
  expect(renderedComponent.find('.icons-menu-down').length).toBe(1);
});
