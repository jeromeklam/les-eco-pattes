import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/movement/List';

describe('movement/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      movement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.movement-list').length
    ).toBe(1);
  });
});
