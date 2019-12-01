import React from 'react';
import { shallow } from 'enzyme';
import { About } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<About />);
  expect(renderedComponent.find('.icons-about').length).toBe(1);
});
