import React from 'react';
import { shallow } from 'enzyme';
import { Task } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Task />);
  expect(renderedComponent.find('.icons-task').length).toBe(1);
});
