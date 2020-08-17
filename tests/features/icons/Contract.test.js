import React from 'react';
import { shallow } from 'enzyme';
import { Contract } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Contract />);
  expect(renderedComponent.find('.icons-contract').length).toBe(1);
});
