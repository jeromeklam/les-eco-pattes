import React from 'react';
import { shallow } from 'enzyme';
import { InlineSicknesses } from '../../../src/features/cause-sickness/InlineSicknesses';

describe('cause-sickness/InlineSicknesses', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeSickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineSicknesses {...props} />
    );

    expect(
      renderedComponent.find('.cause-sickness-inline-sicknesses').length
    ).toBe(1);
  });
});
