import React from 'react';
import { shallow } from 'enzyme';
import { InlineMovements } from '../../../src/features/cause-movement/InlineMovements';

describe('cause-movement/InlineMovements', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMovement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineMovements {...props} />
    );

    expect(
      renderedComponent.find('.cause-movement-inline-movements').length
    ).toBe(1);
  });
});
