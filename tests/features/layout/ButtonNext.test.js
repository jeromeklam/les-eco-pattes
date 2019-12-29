import React from 'react';
import { shallow } from 'enzyme';
import { ButtonNext } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonNext />);
  expect(renderedComponent.find('.layout-button-next').length).toBe(1);
});
