import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Settings />);
  expect(renderedComponent.find('.icons-settings').length).toBe(1);
});
