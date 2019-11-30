import React from 'react';
import { shallow } from 'enzyme';
import { MobileListLineCol } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MobileListLineCol />);
  expect(renderedComponent.find('.common-mobile-list-line-col').length).toBe(1);
});
