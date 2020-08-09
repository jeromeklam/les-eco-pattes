import React from 'react';
import { shallow } from 'enzyme';
import { Comment } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Comment />);
  expect(renderedComponent.find('.icons-comment').length).toBe(1);
});
