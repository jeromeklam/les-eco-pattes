import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/client-type/Input';

describe('client-type/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      clientType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.client-type-input').length
    ).toBe(1);
  });
});
