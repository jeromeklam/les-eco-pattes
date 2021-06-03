import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/cause/Input';

describe('cause/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.cause-input').length
    ).toBe(1);
  });
});
