import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/client-type/List';

describe('client-type/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.client-type-list').length
    ).toBe(1);
  });
});
