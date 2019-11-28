import React from 'react';
import { shallow } from 'enzyme';
import { ButtonGetOne } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonGetOne />);
  expect(renderedComponent.find('.layout-button-get-one').length).toBe(1);
});
