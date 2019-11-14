import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/site/List';

describe('site/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      site: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.site-list').length
    ).toBe(1);
  });
});
