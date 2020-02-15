import React from 'react';
import { shallow } from 'enzyme';
import { TreeviewList } from '../../../src/features/stock/TreeviewList';

describe('stock/TreeviewList', () => {
  it('renders node with correct class name', () => {
    const props = {
      stock: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TreeviewList {...props} />
    );

    expect(
      renderedComponent.find('.stock-treeview-list').length
    ).toBe(1);
  });
});
