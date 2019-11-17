import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/cause/List';

describe('cause/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      cause: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.cause-list').length
    ).toBe(1);
  });
});
