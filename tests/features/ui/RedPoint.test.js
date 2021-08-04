import React from 'react';
import { shallow } from 'enzyme';
import { RedPoint } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RedPoint />);
  expect(renderedComponent.find('.ui-red-point').length).toBe(1);
});
