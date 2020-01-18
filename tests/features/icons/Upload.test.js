import React from 'react';
import { shallow } from 'enzyme';
import { Upload } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Upload />);
  expect(renderedComponent.find('.icons-upload').length).toBe(1);
});
