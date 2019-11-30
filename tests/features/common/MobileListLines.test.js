import React from 'react';
import { shallow } from 'enzyme';
import { MobileListLines } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileListLines />);
  expect(renderedComponent.find('.common-mobile-list-lines').length).toBe(1);
});
