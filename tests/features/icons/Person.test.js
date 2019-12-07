import React from 'react';
import { shallow } from 'enzyme';
import { Person } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Person />);
  expect(renderedComponent.find('.icons-person').length).toBe(1);
});
