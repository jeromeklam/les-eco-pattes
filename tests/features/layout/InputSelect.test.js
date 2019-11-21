import React from 'react';
import { shallow } from 'enzyme';
import { InputSelect } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputSelect />);
  expect(renderedComponent.find('.layout-input-select').length).toBe(1);
});
