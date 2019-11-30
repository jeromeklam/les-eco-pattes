import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveListLines } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveListLines />);
  expect(renderedComponent.find('.common-responsive-list-lines').length).toBe(1);
});
