import React from 'react';
import { shallow } from 'enzyme';
import { InlineListGroup } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineListGroup />);
  expect(renderedComponent.find('.cause-inline-list-group').length).toBe(1);
});
