import React from 'react';
import { shallow } from 'enzyme';
import { Follow } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Follow />);
  expect(renderedComponent.find('.icons-follow').length).toBe(1);
});
