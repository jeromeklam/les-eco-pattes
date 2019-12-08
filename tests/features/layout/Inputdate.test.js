import React from 'react';
import { shallow } from 'enzyme';
import { Inputdate } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Inputdate />);
  expect(renderedComponent.find('.layout-inputdate').length).toBe(1);
});
