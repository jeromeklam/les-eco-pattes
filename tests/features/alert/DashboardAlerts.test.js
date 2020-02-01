import React from 'react';
import { shallow } from 'enzyme';
import { DashboardAlerts } from '../../../src/features/alert/DashboardAlerts';

describe('alert/DashboardAlerts', () => {
  it('renders node with correct class name', () => {
    const props = {
      alert: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardAlerts {...props} />
    );

    expect(
      renderedComponent.find('.alert-dashboard-alerts').length
    ).toBe(1);
  });
});
