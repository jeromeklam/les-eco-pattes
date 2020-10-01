import React from 'react';
import { shallow } from 'enzyme';
import { AddLine } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddLine />);
  expect(renderedComponent.find('.icons-add-line').length).toBe(1);
});
