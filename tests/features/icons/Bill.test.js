import React from 'react';
import { shallow } from 'enzyme';
import { Bill } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Bill />);
  expect(renderedComponent.find('.icons-bill').length).toBe(1);
});
