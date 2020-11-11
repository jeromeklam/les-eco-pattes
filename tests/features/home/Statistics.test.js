import React from 'react';
import { shallow } from 'enzyme';
import { Statistics } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Statistics />);
  expect(renderedComponent.find('.home-statistics').length).toBe(1);
});
