import React from 'react';
import { shallow } from 'enzyme';
import { Close } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Close />);
  expect(renderedComponent.find('.icons-close').length).toBe(1);
});
