import React from 'react';
import { shallow } from 'enzyme';
import { Documents } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Documents />);
  expect(renderedComponent.find('.icons-documents').length).toBe(1);
});
