import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/client/Create';

describe('client/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      client: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.client-create').length
    ).toBe(1);
  });
});
