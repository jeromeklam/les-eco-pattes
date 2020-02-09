import React from 'react';
import { shallow } from 'enzyme';
import { Version } from '../../../src/features/help';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Version />);
  expect(renderedComponent.find('.help-version').length).toBe(1);
});
