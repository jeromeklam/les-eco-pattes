import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/client-type/Modify';

describe('client-type/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.client-type-modify').length
    ).toBe(1);
  });
});
