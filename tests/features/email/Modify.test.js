import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/email/Modify';

describe('email/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      email: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.email-modify').length
    ).toBe(1);
  });
});
