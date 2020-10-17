import React from 'react';
import { shallow } from 'enzyme';
import { WelcomPage } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<WelcomPage />);
  expect(renderedComponent.find('.home-welcom-page').length).toBe(1);
});
