import React from 'react';
import { shallow } from 'enzyme';
import { Descendant } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Descendant />);
  expect(renderedComponent.find('.icons-descendant').length).toBe(1);
});
