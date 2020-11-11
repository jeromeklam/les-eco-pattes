import React from 'react';
import { shallow } from 'enzyme';
import { HomeTimeline } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<HomeTimeline />);
  expect(renderedComponent.find('.home-home-timeline').length).toBe(1);
});
