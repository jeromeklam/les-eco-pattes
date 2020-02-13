import React from 'react';
import { shallow } from 'enzyme';
import { Female } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Female />);
  expect(renderedComponent.find('.icons-female').length).toBe(1);
});
