import React from 'react';
import { shallow } from 'enzyme';
import { Down } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Down />);
  expect(renderedComponent.find('.icons-down').length).toBe(1);
});
