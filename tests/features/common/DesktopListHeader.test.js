import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListHeader />);
  expect(renderedComponent.find('.common-desktop-list-header').length).toBe(1);
});
