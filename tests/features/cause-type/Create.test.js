import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/cause-type/Create';

describe('cause-type/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.cause-type-create').length
    ).toBe(1);
  });
});
