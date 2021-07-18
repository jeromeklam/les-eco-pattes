import React from 'react';
import { shallow } from 'enzyme';
import { InboxFull } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InboxFull />);
  expect(renderedComponent.find('.icons-inbox-full').length).toBe(1);
});
