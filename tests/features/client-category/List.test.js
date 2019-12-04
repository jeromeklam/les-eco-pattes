import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/client-category/List';

describe('client-category/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientCategory: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.client-category-list').length
    ).toBe(1);
  });
});
