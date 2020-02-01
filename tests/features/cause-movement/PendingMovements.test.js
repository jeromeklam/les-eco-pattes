import React from 'react';
import { shallow } from 'enzyme';
import { PendingMovements } from '../../../src/features/cause-movement/PendingMovements';

describe('cause-movement/PendingMovements', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMovement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PendingMovements {...props} />
    );

    expect(
      renderedComponent.find('.cause-movement-pending-movements').length
    ).toBe(1);
  });
});
