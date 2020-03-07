import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveGridCard } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveGridCard />);
  expect(renderedComponent.find('.ui-responsive-grid-card').length).toBe(1);
});
