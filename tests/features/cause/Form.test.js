import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/cause/Form';

describe('cause/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.cause-form').length
    ).toBe(1);
  });
});
