import React from 'react';
import { shallow } from 'enzyme';
import { MenuOpened } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MenuOpened />);
  expect(renderedComponent.find('.icons-menu-opened').length).toBe(1);
});
