import React from 'react';
import { shallow } from 'enzyme';
import { Cancel } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Cancel />);
  expect(renderedComponent.find('.icons-cancel').length).toBe(1);
});
