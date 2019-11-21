import React from 'react';
import { shallow } from 'enzyme';
import { DesktopLine } from '../../../src/features/data';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DesktopLine />);
  expect(renderedComponent.find('.data-desktop-line').length).toBe(1);
});
