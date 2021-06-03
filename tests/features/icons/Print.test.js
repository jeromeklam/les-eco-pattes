import React from 'react';
import { shallow } from 'enzyme';
import { Print } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Print />);
  expect(renderedComponent.find('.icons-print').length).toBe(1);
});
