import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/cause-type';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Form />);
  expect(renderedComponent.find('.cause-type-form').length).toBe(1);
});
