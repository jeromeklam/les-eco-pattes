import React from 'react';
import { shallow } from 'enzyme';
import { ButtonTab } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonTab />);
  expect(renderedComponent.find('.layout-button-tab').length).toBe(1);
});
