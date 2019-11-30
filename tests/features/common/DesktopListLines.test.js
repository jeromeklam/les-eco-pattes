import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListLines } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListLines />);
  expect(renderedComponent.find('.common-desktop-list-lines').length).toBe(1);
});
