import React from 'react';
import { shallow } from 'enzyme';
import { SimpleForm } from '../../../src/features/auth/SimpleForm';

describe('auth/SimpleForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SimpleForm {...props} />
    );

    expect(
      renderedComponent.find('.auth-simple-form').length
    ).toBe(1);
  });
});
