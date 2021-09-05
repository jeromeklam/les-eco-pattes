import React from 'react';
import { shallow } from 'enzyme';
import { Help } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Help />);
  expect(renderedComponent.find('.icons-help').length).toBe(1);
});
