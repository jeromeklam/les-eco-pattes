import React from 'react';
import { shallow } from 'enzyme';
import { InputData } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputData />);
  expect(renderedComponent.find('.layout-input-data').length).toBe(1);
});
