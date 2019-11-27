import React from 'react';
import { shallow } from 'enzyme';
import { Account } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Account />);
  expect(renderedComponent.find('.icons-account').length).toBe(1);
});
