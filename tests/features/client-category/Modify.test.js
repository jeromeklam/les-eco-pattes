import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/client-category/Modify';

describe('client-category/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientCategory: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.client-category-modify').length
    ).toBe(1);
  });
});
