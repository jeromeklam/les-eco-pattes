import React from 'react';
import { shallow } from 'enzyme';
import { SettingsTab } from '../../../src/features/auth/SettingsTab';

describe('auth/SettingsTab', () => {
  it('renders node with correct class name', () => {
    const props = {
      auth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SettingsTab {...props} />
    );

    expect(
      renderedComponent.find('.auth-settings-tab').length
    ).toBe(1);
  });
});
