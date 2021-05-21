import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/cause-sickness/Input';

describe('cause-sickness/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeSickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.cause-sickness-input').length
    ).toBe(1);
  });
});
