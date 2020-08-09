import React from 'react';
import { shallow } from 'enzyme';
import { CommentModal } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CommentModal />);
  expect(renderedComponent.find('.ui-comment-modal').length).toBe(1);
});
