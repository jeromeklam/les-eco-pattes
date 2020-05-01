import React from 'react';
import { shallow } from 'enzyme';
import { ColCheck } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ColCheck />);
  expect(renderedComponent.find('.icons-col-check').length).toBe(1);
});
