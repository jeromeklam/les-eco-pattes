import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Home />);
  expect(renderedComponent.find('.icons-home').length).toBe(1);
});
