import React from 'react';
import { shallow } from 'enzyme';
import { InlineList } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineList />);
  expect(renderedComponent.find('.ui-inline-list').length).toBe(1);
});
