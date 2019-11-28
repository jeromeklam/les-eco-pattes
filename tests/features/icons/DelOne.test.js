import React from 'react';
import { shallow } from 'enzyme';
import { DelOne } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DelOne />);
  expect(renderedComponent.find('.icons-del-one').length).toBe(1);
});
