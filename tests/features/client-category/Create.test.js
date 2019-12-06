import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/client-category/Create';

describe('client-category/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientCategory: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.client-category-create').length
    ).toBe(1);
  });
});
