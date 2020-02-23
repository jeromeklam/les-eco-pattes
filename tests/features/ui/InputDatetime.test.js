import React from 'react';
import { shallow } from 'enzyme';
import { InputDatetime } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputDatetime />);
  expect(renderedComponent.find('.ui-input-datetime').length).toBe(1);
});
