import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<User />);
  expect(renderedComponent.find('.icons-user').length).toBe(1);
});
