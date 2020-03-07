import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/family/Modify';

describe('family/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      family: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.family-modify').length
    ).toBe(1);
  });
});
