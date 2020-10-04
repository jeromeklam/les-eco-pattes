import React from 'react';
import { shallow } from 'enzyme';
import { Important } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Important />);
  expect(renderedComponent.find('.icons-important').length).toBe(1);
});
