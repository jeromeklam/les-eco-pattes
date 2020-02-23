import React from 'react';
import { shallow } from 'enzyme';
import { InputYear } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputYear />);
  expect(renderedComponent.find('.ui-input-year').length).toBe(1);
});
