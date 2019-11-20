import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/site-type/List';

describe('site-type/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      siteType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.site-type-list').length
    ).toBe(1);
  });
});
