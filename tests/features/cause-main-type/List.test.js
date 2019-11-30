import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/cause-main-type/List';

describe('cause-main-type/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeMainType: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.cause-main-type-list').length
    ).toBe(1);
  });
});
