import React from 'react';
import { shallow } from 'enzyme';
import { Checked } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Checked />);
  expect(renderedComponent.find('.icons-checked').length).toBe(1);
});
