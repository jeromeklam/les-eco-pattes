import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/site-type';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Form />);
  expect(renderedComponent.find('.site-type-form').length).toBe(1);
});
