import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/family/Input';

describe('family/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      family: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.family-input').length
    ).toBe(1);
  });
});
