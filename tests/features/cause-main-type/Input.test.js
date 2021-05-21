import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/cause-main-type/Input';

describe('cause-main-type/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMainType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.cause-main-type-input').length
    ).toBe(1);
  });
});
