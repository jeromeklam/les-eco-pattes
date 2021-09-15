import React from 'react';
import { shallow } from 'enzyme';
import { Valid } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Valid />);
  expect(renderedComponent.find('.icons-valid').length).toBe(1);
});
