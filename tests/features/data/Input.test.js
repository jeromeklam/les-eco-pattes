import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/data/Input';

describe('data/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.data-input').length
    ).toBe(1);
  });
});
