import React from 'react';
import { shallow } from 'enzyme';
import { Signout } from '../../../src/features/auth/Signout';

describe('auth/Signout', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Signout {...props} />
    );

    expect(
      renderedComponent.find('.auth-signout').length
    ).toBe(1);
  });
});
