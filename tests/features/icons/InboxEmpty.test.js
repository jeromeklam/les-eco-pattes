import React from 'react';
import { shallow } from 'enzyme';
import { InboxEmpty } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InboxEmpty />);
  expect(renderedComponent.find('.icons-inbox-empty').length).toBe(1);
});
