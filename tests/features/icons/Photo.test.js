import React from 'react';
import { shallow } from 'enzyme';
import { Photo } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Photo />);
  expect(renderedComponent.find('.icons-photo').length).toBe(1);
});
