import React from 'react';
import { shallow } from 'enzyme';
import { AccountClose } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AccountClose />);
  expect(renderedComponent.find('.icons-account-close').length).toBe(1);
});
