import React from 'react';
import { shallow } from 'enzyme';
import { ButtonAdd } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonAdd />);
  expect(renderedComponent.find('.layout-button-add').length).toBe(1);
});
