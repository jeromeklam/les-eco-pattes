import React from 'react';
import { shallow } from 'enzyme';
import { DesktopListLineCol } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopListLineCol />);
  expect(renderedComponent.find('.common-desktop-list-line-col').length).toBe(1);
});
