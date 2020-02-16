import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/item/Create';

describe('item/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      item: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.item-create').length
    ).toBe(1);
  });
});
