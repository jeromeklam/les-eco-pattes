import React from 'react';
import { shallow } from 'enzyme';
import { Agenda } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Agenda />);
  expect(renderedComponent.find('.icons-agenda').length).toBe(1);
});
