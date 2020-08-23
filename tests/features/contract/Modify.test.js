import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/contract/Modify';

describe('contract/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.contract-modify').length
    ).toBe(1);
  });
});
