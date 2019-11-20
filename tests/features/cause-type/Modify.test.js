import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/cause-type/Modify';

describe('cause-type/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.cause-type-modify').length
    ).toBe(1);
  });
});
