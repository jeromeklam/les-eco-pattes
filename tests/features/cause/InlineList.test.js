import React from 'react';
import { shallow } from 'enzyme';
import { InlineList } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineList />);
  expect(renderedComponent.find('.cause-inline-list').length).toBe(1);
});
