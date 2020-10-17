import React from 'react';
import { shallow } from 'enzyme';
import { Page } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Page />);
  expect(renderedComponent.find('.home-page').length).toBe(1);
});
