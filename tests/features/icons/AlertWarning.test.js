import React from 'react';
import { shallow } from 'enzyme';
import { AlertWarning } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AlertWarning />);
  expect(renderedComponent.find('.icons-alert-warning').length).toBe(1);
});
