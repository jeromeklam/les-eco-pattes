import React from 'react';
import { shallow } from 'enzyme';
import { Stock } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Stock />);
  expect(renderedComponent.find('.icons-stock').length).toBe(1);
});
