import React from 'react';
import { shallow } from 'enzyme';
import { Line } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Line />);
  expect(renderedComponent.find('.ui-line').length).toBe(1);
});
