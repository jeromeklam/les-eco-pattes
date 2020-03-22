import React from 'react';
import { shallow } from 'enzyme';
import { AccountDetail } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AccountDetail />);
  expect(renderedComponent.find('.icons-account-detail').length).toBe(1);
});
