import React from 'react';
import { shallow } from 'enzyme';
import { InputStringarray } from '../../../src/features/ui';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputStringarray />);
  expect(renderedComponent.find('.ui-input-stringarray').length).toBe(1);
});
