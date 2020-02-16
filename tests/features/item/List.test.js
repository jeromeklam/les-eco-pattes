import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/item/List';

describe('item/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      item: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.item-list').length
    ).toBe(1);
  });
});
