import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/alert/Input';

describe('alert/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.alert-input').length
    ).toBe(1);
  });
});
