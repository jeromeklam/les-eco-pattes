import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Avatar />);
  expect(renderedComponent.find('.ui-avatar').length).toBe(1);
});
