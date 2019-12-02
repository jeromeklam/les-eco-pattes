import React from 'react';
import { shallow } from 'enzyme';
import { ModalResponsive } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ModalResponsive />);
  expect(renderedComponent.find('.layout-modal-responsive').length).toBe(1);
});
