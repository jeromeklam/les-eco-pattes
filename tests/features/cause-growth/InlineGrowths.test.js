import React from 'react';
import { shallow } from 'enzyme';
import { InlineGrowths } from '../../../src/features/cause-growth/InlineGrowths';

describe('cause-growth/InlineGrowths', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeGrowth: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineGrowths {...props} />
    );

    expect(
      renderedComponent.find('.cause-growth-inline-growths').length
    ).toBe(1);
  });
});
