import React from 'react';
import { shallow } from 'enzyme';
import { Document } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Document />);
  expect(renderedComponent.find('.icons-document').length).toBe(1);
});
