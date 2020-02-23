import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/movement/Create';

describe('movement/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.movement-create').length
    ).toBe(1);
  });
});
