import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Calendar />);
  expect(renderedComponent.find('.icons-calendar').length).toBe(1);
});
