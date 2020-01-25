import React from 'react';
import { shallow } from 'enzyme';
import { Icon } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Icon />);
  expect(renderedComponent.find('.icons-icon').length).toBe(1);
});
