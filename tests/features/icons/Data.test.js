import React from 'react';
import { shallow } from 'enzyme';
import { Data } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Data />);
  expect(renderedComponent.find('.icons-data').length).toBe(1);
});
