import React from 'react';
import { shallow } from 'enzyme';
import { AlertDanger } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AlertDanger />);
  expect(renderedComponent.find('.icons-alert-danger').length).toBe(1);
});
