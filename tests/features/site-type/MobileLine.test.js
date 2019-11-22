import React from 'react';
import { shallow } from 'enzyme';
import { MobileLine } from '../../../src/features/site-type';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileLine />);
  expect(renderedComponent.find('.site-type-mobile-line').length).toBe(1);
});
