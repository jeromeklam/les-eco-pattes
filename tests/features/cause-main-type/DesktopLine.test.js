import React from 'react';
import { shallow } from 'enzyme';
import { DesktopLine } from '../../../src/features/cause-main-type';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopLine />);
  expect(renderedComponent.find('.cause-main-type-desktop-line').length).toBe(1);
});
