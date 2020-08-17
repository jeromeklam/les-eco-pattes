import React from 'react';
import { shallow } from 'enzyme';
import { PendingAlerts } from '../../../src/features/alert/PendingAlerts';

describe('alert/PendingAlerts', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PendingAlerts {...props} />
    );

    expect(
      renderedComponent.find('.alert-pending-alerts').length
    ).toBe(1);
  });
});
