import React from 'react';
import { shallow } from 'enzyme';
import { MobileListLine } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileListLine />);
  expect(renderedComponent.find('.common-mobile-list-line').length).toBe(1);
});
