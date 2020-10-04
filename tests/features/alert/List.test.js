import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/alert/List';

describe('alert/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.alert-list').length
    ).toBe(1);
  });
});
