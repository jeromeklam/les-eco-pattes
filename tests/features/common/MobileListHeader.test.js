import React from 'react';
import { shallow } from 'enzyme';
import { MobileListHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileListHeader />);
  expect(renderedComponent.find('.common-mobile-list-header').length).toBe(1);
});
