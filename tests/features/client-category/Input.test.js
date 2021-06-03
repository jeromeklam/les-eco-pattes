import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/client-category/Input';

describe('client-category/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientCategory: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.client-category-input').length
    ).toBe(1);
  });
});
