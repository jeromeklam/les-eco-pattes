import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/email/Create';

describe('email/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      email: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.email-create').length
    ).toBe(1);
  });
});
