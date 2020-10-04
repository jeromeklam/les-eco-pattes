import React from 'react';
import { shallow } from 'enzyme';
import { Critical } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Critical />);
  expect(renderedComponent.find('.icons-critical').length).toBe(1);
});
