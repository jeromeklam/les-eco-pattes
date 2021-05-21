import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/cause-type/Input';

describe('cause-type/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.cause-type-input').length
    ).toBe(1);
  });
});
