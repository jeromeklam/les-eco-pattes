import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/edition/Input';

describe('edition/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      edition: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.edition-input').length
    ).toBe(1);
  });
});
