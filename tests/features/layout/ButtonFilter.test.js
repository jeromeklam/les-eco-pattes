import React from 'react';
import { shallow } from 'enzyme';
import { ButtonFilter } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonFilter />);
  expect(renderedComponent.find('.layout-button-filter').length).toBe(1);
});
