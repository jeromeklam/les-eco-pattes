import React from 'react';
import { shallow } from 'enzyme';
import { Previous } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Previous />);
  expect(renderedComponent.find('.icons-previous').length).toBe(1);
});
