import React from 'react';
import { shallow } from 'enzyme';
import { ButtonPrevious } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonPrevious />);
  expect(renderedComponent.find('.layout-button-previous').length).toBe(1);
});
