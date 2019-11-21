import React from 'react';
import { shallow } from 'enzyme';
import { MobileMenu } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileMenu />);
  expect(renderedComponent.find('.common-mobile-menu').length).toBe(1);
});
