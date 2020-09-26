import React from 'react';
import { shallow } from 'enzyme';
import { UnChecked } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UnChecked />);
  expect(renderedComponent.find('.icons-un-checked').length).toBe(1);
});
