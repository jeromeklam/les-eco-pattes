import React from 'react';
import { shallow } from 'enzyme';
import { InputSpin } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputSpin />);
  expect(renderedComponent.find('.ui-input-spin').length).toBe(1);
});
