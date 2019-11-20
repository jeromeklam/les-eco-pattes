import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/site-type/Modify';

describe('site-type/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      siteType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.site-type-modify').length
    ).toBe(1);
  });
});
