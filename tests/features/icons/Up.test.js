import React from 'react';
import { shallow } from 'enzyme';
import { Up } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Up />);
  expect(renderedComponent.find('.icons-up').length).toBe(1);
});
