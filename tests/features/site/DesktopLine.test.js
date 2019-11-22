import React from 'react';
import { shallow } from 'enzyme';
import { DesktopLine } from '../../../src/features/site';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopLine />);
  expect(renderedComponent.find('.site-desktop-line').length).toBe(1);
});
