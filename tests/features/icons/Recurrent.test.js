import React from 'react';
import { shallow } from 'enzyme';
import { Recurrent } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Recurrent />);
  expect(renderedComponent.find('.icons-recurrent').length).toBe(1);
});
