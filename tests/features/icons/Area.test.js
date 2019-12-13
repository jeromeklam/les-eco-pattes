import React from 'react';
import { shallow } from 'enzyme';
import { Area } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Area />);
  expect(renderedComponent.find('.icons-area').length).toBe(1);
});
