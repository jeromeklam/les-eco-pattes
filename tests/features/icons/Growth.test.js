import React from 'react';
import { shallow } from 'enzyme';
import { Growth } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Growth />);
  expect(renderedComponent.find('.icons-growth').length).toBe(1);
});
