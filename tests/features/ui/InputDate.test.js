import React from 'react';
import { shallow } from 'enzyme';
import { InputDate } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputDate />);
  expect(renderedComponent.find('.ui-input-date').length).toBe(1);
});
