import React from 'react';
import { shallow } from 'enzyme';
import { PendingSicknesses } from '../../../src/features/cause-sickness/PendingSicknesses';

describe('cause-sickness/PendingSicknesses', () => {
  it('renders node with correct class name', () => {
    const props = {
      causeSickness: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PendingSicknesses {...props} />
    );

    expect(
      renderedComponent.find('.cause-sickness-pending-sicknesses').length
    ).toBe(1);
  });
});
