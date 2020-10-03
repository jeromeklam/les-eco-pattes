import React from 'react';
import { shallow } from 'enzyme';
import { InputPicker } from '../../../src/features/contract/InputPicker';

describe('contract/InputPicker', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InputPicker {...props} />
    );

    expect(
      renderedComponent.find('.contract-input-picker').length
    ).toBe(1);
  });
});
