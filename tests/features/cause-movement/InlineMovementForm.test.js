import React from 'react';
import { shallow } from 'enzyme';
import { InlineMovementForm } from '../../../src/features/cause-movement/InlineMovementForm';

describe('cause-movement/InlineMovementForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMovement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineMovementForm {...props} />
    );

    expect(
      renderedComponent.find('.cause-movement-inline-movement-form').length
    ).toBe(1);
  });
});
