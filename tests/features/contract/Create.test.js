import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/contract/Create';

describe('contract/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.contract-create').length
    ).toBe(1);
  });
});
