import React from 'react';
import { shallow } from 'enzyme';
import { InputText } from '../../../src/features/layout';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputText />);
  expect(renderedComponent.find('.layout-input-text').length).toBe(1);
});
