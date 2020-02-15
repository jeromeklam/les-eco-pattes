import React from 'react';
import { shallow } from 'enzyme';
import { Treeview } from '../../../src/features/family/Treeview';

describe('family/Treeview', () => {
  it('renders node with correct class name', () => {
    const props = {
      family: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Treeview {...props} />
    );

    expect(
      renderedComponent.find('.family-treeview').length
    ).toBe(1);
  });
});
