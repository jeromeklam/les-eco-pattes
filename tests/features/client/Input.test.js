import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/client/Input';

describe('client/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      client: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.client-input').length
    ).toBe(1);
  });
});
