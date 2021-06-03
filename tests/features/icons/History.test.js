import React from 'react';
import { shallow } from 'enzyme';
import { History } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<History />);
  expect(renderedComponent.find('.icons-history').length).toBe(1);
});
