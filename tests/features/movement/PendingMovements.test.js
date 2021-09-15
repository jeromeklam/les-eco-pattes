import React from 'react';
import { shallow } from 'enzyme';
import { PendingMovements } from '../../../src/features/movement/PendingMovements';

describe('movement/PendingMovements', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PendingMovements {...props} />
    );

    expect(
      renderedComponent.find('.movement-pending-movements').length
    ).toBe(1);
  });
});
