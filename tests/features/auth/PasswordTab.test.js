import React from 'react';
import { shallow } from 'enzyme';
import { PasswordTab } from '../../../src/features/auth/PasswordTab';

describe('auth/PasswordTab', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PasswordTab {...props} />
    );

    expect(
      renderedComponent.find('.auth-password-tab').length
    ).toBe(1);
  });
});
