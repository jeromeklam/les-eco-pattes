import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/edition/List';

describe('edition/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      edition: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.edition-list').length
    ).toBe(1);
  });
});
