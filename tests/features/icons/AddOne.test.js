import React from 'react';
import { shallow } from 'enzyme';
import { AddOne } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddOne />);
  expect(renderedComponent.find('.icons-add-one').length).toBe(1);
});
