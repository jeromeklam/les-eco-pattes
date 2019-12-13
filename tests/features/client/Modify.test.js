import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/client/Modify';

describe('client/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      client: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.client-modify').length
    ).toBe(1);
  });
});
