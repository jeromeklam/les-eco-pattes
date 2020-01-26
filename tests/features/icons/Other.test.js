import React from 'react';
import { shallow } from 'enzyme';
import { Other } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Other />);
  expect(renderedComponent.find('.icons-other').length).toBe(1);
});
