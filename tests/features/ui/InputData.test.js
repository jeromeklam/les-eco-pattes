import React from 'react';
import { shallow } from 'enzyme';
import { InputData } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputData />);
  expect(renderedComponent.find('.ui-input-data').length).toBe(1);
});
