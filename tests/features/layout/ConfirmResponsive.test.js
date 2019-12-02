import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmResponsive } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ConfirmResponsive />);
  expect(renderedComponent.find('.layout-confirm-responsive').length).toBe(1);
});
