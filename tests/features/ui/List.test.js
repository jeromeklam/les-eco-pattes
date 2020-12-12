import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/ui/List';

describe('ui/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      ui: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.ui-list').length
    ).toBe(1);
  });
});
