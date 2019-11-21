import React from 'react';
import { shallow } from 'enzyme';
import { ButtonSubmit } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonSubmit />);
  expect(renderedComponent.find('.layout-button-submit').length).toBe(1);
});
