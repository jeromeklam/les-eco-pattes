import React from 'react';
import { shallow } from 'enzyme';
import { Submit } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Submit />);
  expect(renderedComponent.find('.icons-submit').length).toBe(1);
});
