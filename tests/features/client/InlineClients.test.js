import React from 'react';
import { shallow } from 'enzyme';
import { InlineClients } from '../../../src/features/client';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InlineClients />);
  expect(renderedComponent.find('.client-inline-clients').length).toBe(1);
});
