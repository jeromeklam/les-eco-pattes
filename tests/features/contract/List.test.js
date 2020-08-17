import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/contract/List';

describe('contract/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      contract: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.contract-list').length
    ).toBe(1);
  });
});
