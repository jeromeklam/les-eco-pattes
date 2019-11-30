import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/cause-main-type/Modify';

describe('cause-main-type/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMainType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.cause-main-type-modify').length
    ).toBe(1);
  });
});
