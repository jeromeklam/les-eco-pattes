import React from 'react';
import { shallow } from 'enzyme';
import { ButtonAddOne } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonAddOne />);
  expect(renderedComponent.find('.layout-button-add-one').length).toBe(1);
});
