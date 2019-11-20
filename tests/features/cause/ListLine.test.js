import React from 'react';
import { shallow } from 'enzyme';
import { ListLine } from '../../../src/features/cause';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ListLine />);
  expect(renderedComponent.find('.cause-list-line').length).toBe(1);
});
