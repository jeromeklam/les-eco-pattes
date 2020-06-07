import React from 'react';
import { shallow } from 'enzyme';
import { SimpleCheck } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleCheck />);
  expect(renderedComponent.find('.icons-simple-check').length).toBe(1);
});
