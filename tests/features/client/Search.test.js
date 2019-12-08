import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/client';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.client-search').length).toBe(1);
});
