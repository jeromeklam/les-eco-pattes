import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/movement/Modify';

describe('movement/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.movement-modify').length
    ).toBe(1);
  });
});
