import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/cause-type/List';

describe('cause-type/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.cause-type-list').length
    ).toBe(1);
  });
});
