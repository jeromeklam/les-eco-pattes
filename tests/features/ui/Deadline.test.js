import React from 'react';
import { shallow } from 'enzyme';
import { Deadline } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Deadline />);
  expect(renderedComponent.find('.ui-deadline').length).toBe(1);
});
