import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/data/Create';

describe('data/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.data-create').length
    ).toBe(1);
  });
});
