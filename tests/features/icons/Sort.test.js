import React from 'react';
import { shallow } from 'enzyme';
import { Sort } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Sort />);
  expect(renderedComponent.find('.icons-sort').length).toBe(1);
});
