import React from 'react';
import { shallow } from 'enzyme';
import { MobileListFooter } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileListFooter />);
  expect(renderedComponent.find('.common-mobile-list-footer').length).toBe(1);
});
