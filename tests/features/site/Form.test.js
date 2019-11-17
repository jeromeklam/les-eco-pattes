import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/site/Form';

describe('site/Form', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Form {...props} />
    );

    expect(
      renderedComponent.find('.site-form').length
    ).toBe(1);
  });
});
