import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/email/List';

describe('email/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      email: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.email-list').length
    ).toBe(1);
  });
});
