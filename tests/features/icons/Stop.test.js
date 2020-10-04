import React from 'react';
import { shallow } from 'enzyme';
import { Stop } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Stop />);
  expect(renderedComponent.find('.icons-stop').length).toBe(1);
});
