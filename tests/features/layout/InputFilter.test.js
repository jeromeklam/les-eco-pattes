import React from 'react';
import { shallow } from 'enzyme';
import { InputFilter } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputFilter />);
  expect(renderedComponent.find('.layout-input-filter').length).toBe(1);
});
