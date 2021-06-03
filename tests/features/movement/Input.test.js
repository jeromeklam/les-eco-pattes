import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/movement/Input';

describe('movement/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.movement-input').length
    ).toBe(1);
  });
});
