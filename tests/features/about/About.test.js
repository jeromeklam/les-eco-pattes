import React from 'react';
import { shallow } from 'enzyme';
import { About } from '../../../src/features/about';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<About />);
  expect(renderedComponent.find('.about-about').length).toBe(1);
});
