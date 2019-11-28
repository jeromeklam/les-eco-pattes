import React from 'react';
import { shallow } from 'enzyme';
import { InputValues } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputValues />);
  expect(renderedComponent.find('.layout-input-values').length).toBe(1);
});
