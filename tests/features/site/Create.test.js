import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/site/Create';

describe('site/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.site-create').length
    ).toBe(1);
  });
});
