import React from 'react';
import { shallow } from 'enzyme';
import { Plus } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Plus />);
  expect(renderedComponent.find('.icons-plus').length).toBe(1);
});
