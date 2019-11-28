import React from 'react';
import { shallow } from 'enzyme';
import { ButtonDelOne } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonDelOne />);
  expect(renderedComponent.find('.layout-button-del-one').length).toBe(1);
});
