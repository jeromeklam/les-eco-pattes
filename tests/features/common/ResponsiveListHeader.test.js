import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveListHeader } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveListHeader />);
  expect(renderedComponent.find('.common-responsive-list-header').length).toBe(1);
});
