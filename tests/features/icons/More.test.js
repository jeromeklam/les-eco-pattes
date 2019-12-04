import React from 'react';
import { shallow } from 'enzyme';
import { More } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<More />);
  expect(renderedComponent.find('.icons-more').length).toBe(1);
});
