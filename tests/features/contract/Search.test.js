import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/contract';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.contract-search').length).toBe(1);
});
