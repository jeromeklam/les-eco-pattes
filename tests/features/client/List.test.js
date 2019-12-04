import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/client/List';

describe('client/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      person: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.client-list').length
    ).toBe(1);
  });
});
