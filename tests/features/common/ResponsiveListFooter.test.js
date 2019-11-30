import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveListFooter } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveListFooter />);
  expect(renderedComponent.find('.common-responsive-list-footer').length).toBe(1);
});
