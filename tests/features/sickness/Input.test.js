import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '../../../src/features/sickness/Input';

describe('sickness/Input', () => {
  it('renders node with correct class name', () => {
    const props = {
      sickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Input {...props} />
    );

    expect(
      renderedComponent.find('.sickness-input').length
    ).toBe(1);
  });
});
