import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListLine } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListLine />);
  expect(renderedComponent.find('.common-desktop-list-line').length).toBe(1);
});
