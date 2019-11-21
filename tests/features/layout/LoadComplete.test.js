import React from 'react';
import { shallow } from 'enzyme';
import { LoadComplete } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoadComplete />);
  expect(renderedComponent.find('.layout-load-complete').length).toBe(1);
});
