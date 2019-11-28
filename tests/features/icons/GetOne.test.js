import React from 'react';
import { shallow } from 'enzyme';
import { GetOne } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GetOne />);
  expect(renderedComponent.find('.icons-get-one').length).toBe(1);
});
