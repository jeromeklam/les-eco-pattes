import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/alert/Modify';

describe('alert/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.alert-modify').length
    ).toBe(1);
  });
});
