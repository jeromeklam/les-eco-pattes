import React from 'react';
import { shallow } from 'enzyme';
import { SocketConnected } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SocketConnected />);
  expect(renderedComponent.find('.icons-socket-connected').length).toBe(1);
});
