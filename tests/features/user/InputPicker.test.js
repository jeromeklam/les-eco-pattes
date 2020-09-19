import React from 'react';
import { shallow } from 'enzyme';
import { InputPicker } from '../../../src/features/user/InputPicker';

describe('user/InputPicker', () => {
  it('renders node with correct class name', () => {
    const props = {
      user: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InputPicker {...props} />
    );

    expect(
      renderedComponent.find('.user-input-picker').length
    ).toBe(1);
  });
});
