import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/client-type/Create';

describe('client-type/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.client-type-create').length
    ).toBe(1);
  });
});
