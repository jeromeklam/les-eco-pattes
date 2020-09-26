import React from 'react';
import { shallow } from 'enzyme';
import { FilterEmpty } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FilterEmpty />);
  expect(renderedComponent.find('.icons-filter-empty').length).toBe(1);
});
