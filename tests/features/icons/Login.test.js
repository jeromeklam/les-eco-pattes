import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Login />);
  expect(renderedComponent.find('.icons-login').length).toBe(1);
});
