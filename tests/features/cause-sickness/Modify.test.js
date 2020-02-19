import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/cause-sickness';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Modify />);
  expect(renderedComponent.find('.cause-sickness-modify').length).toBe(1);
});
