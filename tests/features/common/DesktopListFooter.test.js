import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListFooter } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListFooter />);
  expect(renderedComponent.find('.common-desktop-list-footer').length).toBe(1);
});
