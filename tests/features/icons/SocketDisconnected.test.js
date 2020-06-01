import React from 'react';
import { shallow } from 'enzyme';
import { SocketDisconnected } from '../../../src/features/icons';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SocketDisconnected />);
  expect(renderedComponent.find('.icons-socket-disconnected').length).toBe(1);
});
