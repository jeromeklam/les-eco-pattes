import React from 'react';
import { shallow } from 'enzyme';
import { SimpleValid } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleValid />);
  expect(renderedComponent.find('.icons-simple-valid').length).toBe(1);
});
