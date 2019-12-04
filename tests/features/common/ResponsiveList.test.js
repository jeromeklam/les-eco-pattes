import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveList } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveList />);
  expect(renderedComponent.find('.common-responsive-list').length).toBe(1);
});
