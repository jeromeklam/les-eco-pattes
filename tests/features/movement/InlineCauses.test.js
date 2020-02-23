import React from 'react';
import { shallow } from 'enzyme';
import { InlineCauses } from '../../../src/features/movement/InlineCauses';

describe('movement/InlineCauses', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineCauses {...props} />
    );

    expect(
      renderedComponent.find('.movement-inline-causes').length
    ).toBe(1);
  });
});
