import React from 'react';
import { shallow } from 'enzyme';
import { AskPassword } from '../../../src/features/auth/AskPassword';

describe('auth/AskPassword', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AskPassword {...props} />
    );

    expect(
      renderedComponent.find('.auth-ask-password').length
    ).toBe(1);
  });
});
