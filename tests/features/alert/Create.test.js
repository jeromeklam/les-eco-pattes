import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/alert/Create';

describe('alert/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.alert-create').length
    ).toBe(1);
  });
});
