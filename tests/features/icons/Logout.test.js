import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Logout />);
  expect(renderedComponent.find('.icons-logout').length).toBe(1);
});
