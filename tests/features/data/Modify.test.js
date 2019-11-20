import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/data/Modify';

describe('data/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.data-modify').length
    ).toBe(1);
  });
});
