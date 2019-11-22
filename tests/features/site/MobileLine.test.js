import React from 'react';
import { shallow } from 'enzyme';
import { MobileLine } from '../../../src/features/site';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileLine />);
  expect(renderedComponent.find('.site-mobile-line').length).toBe(1);
});
