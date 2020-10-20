import React from 'react';
import { shallow } from 'enzyme';
import { Security } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Security />);
  expect(renderedComponent.find('.icons-security').length).toBe(1);
});
