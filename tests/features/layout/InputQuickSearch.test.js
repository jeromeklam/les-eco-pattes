import React from 'react';
import { shallow } from 'enzyme';
import { InputQuickSearch } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputQuickSearch />);
  expect(renderedComponent.find('.layout-input-quick-search').length).toBe(1);
});
