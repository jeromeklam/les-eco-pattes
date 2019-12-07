import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Map />);
  expect(renderedComponent.find('.icons-map').length).toBe(1);
});
