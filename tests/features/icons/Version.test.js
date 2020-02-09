import React from 'react';
import { shallow } from 'enzyme';
import { Version } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Version />);
  expect(renderedComponent.find('.icons-version').length).toBe(1);
});
