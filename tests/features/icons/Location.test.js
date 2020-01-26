import React from 'react';
import { shallow } from 'enzyme';
import { Location } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Location />);
  expect(renderedComponent.find('.icons-location').length).toBe(1);
});
