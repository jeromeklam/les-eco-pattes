import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/email/Input';

describe('email/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      email: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.email-input').length
    ).toBe(1);
  });
});
