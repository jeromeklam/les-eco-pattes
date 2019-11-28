import React from 'react';
import { shallow } from 'enzyme';
import { Reload } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Reload />);
  expect(renderedComponent.find('.icons-reload').length).toBe(1);
});
