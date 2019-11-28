import React from 'react';
import { shallow } from 'enzyme';
import { HoverObserver } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<HoverObserver />);
  expect(renderedComponent.find('.layout-hover-observer').length).toBe(1);
});
