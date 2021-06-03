import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/contract/Input';

describe('contract/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.contract-input').length
    ).toBe(1);
  });
});
