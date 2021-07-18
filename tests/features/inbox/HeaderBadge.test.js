import React from 'react';
import { shallow } from 'enzyme';
import { HeaderBadge } from '../../../src/features/inbox/HeaderBadge';

describe('inbox/HeaderBadge', () => {
  it('renders node with correct class name', () => {
    const props = {
      inbox: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <HeaderBadge {...props} />
    );

    expect(
      renderedComponent.find('.inbox-header-badge').length
    ).toBe(1);
  });
});
