import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Search />);
  expect(renderedComponent.find('.cause-search').length).toBe(1);
});
