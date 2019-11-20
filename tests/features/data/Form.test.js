import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/data';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Form />);
  expect(renderedComponent.find('.data-form').length).toBe(1);
});
