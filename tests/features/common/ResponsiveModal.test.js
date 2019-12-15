import React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveModal } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ResponsiveModal />);
  expect(renderedComponent.find('.common-responsive-modal').length).toBe(1);
});
