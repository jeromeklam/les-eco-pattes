import React from 'react';
import { shallow } from 'enzyme';
import { ButtonResponsive } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonResponsive />);
  expect(renderedComponent.find('.layout-button-responsive').length).toBe(1);
});
