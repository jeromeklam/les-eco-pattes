import React from 'react';
import { shallow } from 'enzyme';
import { Check } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Check />);
  expect(renderedComponent.find('.icons-check').length).toBe(1);
});
