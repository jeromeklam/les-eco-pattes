import React from 'react';
import { shallow } from 'enzyme';
import { ButtonReload } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonReload />);
  expect(renderedComponent.find('.layout-button-reload').length).toBe(1);
});
