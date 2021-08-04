import React from 'react';
import { shallow } from 'enzyme';
import { MenuDropDown } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MenuDropDown />);
  expect(renderedComponent.find('.icons-menu-drop-down').length).toBe(1);
});
