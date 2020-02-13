import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/sickness/Create';

describe('sickness/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      sickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.sickness-create').length
    ).toBe(1);
  });
});
