import React from 'react';
import { shallow } from 'enzyme';
import { Expired } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Expired />);
  expect(renderedComponent.find('.icons-expired').length).toBe(1);
});
