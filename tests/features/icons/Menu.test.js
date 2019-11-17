import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Menu />);
  expect(renderedComponent.find('.icons-menu').length).toBe(1);
});
