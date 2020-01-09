import React from 'react';
import { shallow } from 'enzyme';
import { SimpleCancel } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleCancel />);
  expect(renderedComponent.find('.icons-simple-cancel').length).toBe(1);
});
