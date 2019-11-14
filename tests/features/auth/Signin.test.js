import React from 'react';
import { shallow } from 'enzyme';
import { Signin } from '../../../src/features/auth/Signin';

describe('auth/Signin', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Signin {...props} />
    );

    expect(
      renderedComponent.find('.auth-signin').length
    ).toBe(1);
  });
});
