import React from 'react';
import { shallow } from 'enzyme';
import { LoadMore } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoadMore />);
  expect(renderedComponent.find('.layout-load-more').length).toBe(1);
});
