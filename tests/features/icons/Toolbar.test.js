import React from 'react';
import { shallow } from 'enzyme';
import { Toolbar } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Toolbar />);
  expect(renderedComponent.find('.icons-toolbar').length).toBe(1);
});
