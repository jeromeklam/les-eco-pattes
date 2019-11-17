import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/data/List';

describe('data/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      data: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.data-list').length
    ).toBe(1);
  });
});
