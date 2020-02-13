import React from 'react';
import { shallow } from 'enzyme';
import { InlineDescendants } from '../../../src/features/cause/InlineDescendants';

describe('cause/InlineDescendants', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineDescendants {...props} />
    );

    expect(
      renderedComponent.find('.cause-inline-descendants').length
    ).toBe(1);
  });
});
