import React from 'react';
import { shallow } from 'enzyme';
import { Save } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Save />);
  expect(renderedComponent.find('.icons-save').length).toBe(1);
});
