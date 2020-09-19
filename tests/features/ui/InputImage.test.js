import React from 'react';
import { shallow } from 'enzyme';
import { InputImage } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputImage />);
  expect(renderedComponent.find('.ui-input-image').length).toBe(1);
});
