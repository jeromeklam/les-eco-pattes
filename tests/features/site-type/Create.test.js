import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/site-type/Create';

describe('site-type/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      siteType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.site-type-create').length
    ).toBe(1);
  });
});
