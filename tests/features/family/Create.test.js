import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/family/Create';

describe('family/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      family: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.family-create').length
    ).toBe(1);
  });
});
