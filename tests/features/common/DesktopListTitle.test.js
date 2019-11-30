import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListTitle } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListTitle />);
  expect(renderedComponent.find('.common-desktop-list-title').length).toBe(1);
});
