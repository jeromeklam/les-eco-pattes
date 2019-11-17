import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/data/Form';

describe('data/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.data-form').length
    ).toBe(1);
  });
});
