import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/item/Input';

describe('item/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      item: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.item-input').length
    ).toBe(1);
  });
});
