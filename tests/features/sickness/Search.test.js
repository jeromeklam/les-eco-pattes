import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/sickness';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.sickness-search').length).toBe(1);
});
