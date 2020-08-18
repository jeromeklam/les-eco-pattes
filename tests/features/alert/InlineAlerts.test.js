import React from 'react';
import { shallow } from 'enzyme';
import { InlineAlerts } from '../../../src/features/alert/InlineAlerts';

describe('alert/InlineAlerts', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <InlineAlerts {...props} />
    );

    expect(
      renderedComponent.find('.alert-inline-alerts').length
    ).toBe(1);
  });
});
