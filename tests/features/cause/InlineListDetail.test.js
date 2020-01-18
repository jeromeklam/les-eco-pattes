import React from 'react';
import { shallow } from 'enzyme';
import { InlineListDetail } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineListDetail />);
  expect(renderedComponent.find('.cause-inline-list-detail').length).toBe(1);
});
