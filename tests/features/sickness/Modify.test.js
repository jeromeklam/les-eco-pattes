import React from 'react';
import { shallow } from 'enzyme';
import { Modify } from '../../../src/features/sickness/Modify';

describe('sickness/Modify', () => {
  it('renders node with correct class name', () => {
    const props = {
      sickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Modify {...props} />
    );

    expect(
      renderedComponent.find('.sickness-modify').length
    ).toBe(1);
  });
});
