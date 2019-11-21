import React from 'react';
import { shallow } from 'enzyme';
import { ButtonCancel } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonCancel />);
  expect(renderedComponent.find('.layout-button-cancel').length).toBe(1);
});
