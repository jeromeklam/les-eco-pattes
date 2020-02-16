import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/item/Modify';

describe('item/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      item: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.item-modify').length
    ).toBe(1);
  });
});
