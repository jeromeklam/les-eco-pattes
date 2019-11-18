import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/cause/Modify';

describe('cause/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.cause-modify').length
    ).toBe(1);
  });
});
