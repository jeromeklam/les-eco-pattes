import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/cause-main-type/Create';

describe('cause-main-type/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMainType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.cause-main-type-create').length
    ).toBe(1);
  });
});
