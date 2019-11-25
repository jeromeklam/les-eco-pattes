import React from 'react';
import { shallow } from 'enzyme';
import { FormResponsive } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormResponsive />);
  expect(renderedComponent.find('.layout-form-responsive').length).toBe(1);
});
