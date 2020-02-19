import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/cause-sickness/Create';

describe('cause-sickness/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeSickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.cause-sickness-create').length
    ).toBe(1);
  });
});
