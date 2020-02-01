import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Alert />);
  expect(renderedComponent.find('.icons-alert').length).toBe(1);
});
