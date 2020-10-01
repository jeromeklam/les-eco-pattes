import React from 'react';
import { shallow } from 'enzyme';
import { OpenLines } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<OpenLines />);
  expect(renderedComponent.find('.icons-open-lines').length).toBe(1);
});
