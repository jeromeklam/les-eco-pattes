import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/sickness/List';

describe('sickness/List', () => {
  it('renders node with correct class name', () => {
    const props = {
      sickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <List {...props} />
    );

    expect(
      renderedComponent.find('.sickness-list').length
    ).toBe(1);
  });
});
