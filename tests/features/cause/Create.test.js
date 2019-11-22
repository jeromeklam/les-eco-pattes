import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/cause/Create';

describe('cause/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.cause-create').length
    ).toBe(1);
  });
});
