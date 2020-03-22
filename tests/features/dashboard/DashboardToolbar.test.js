import React from 'react';
import { shallow } from 'enzyme';
import { DashboardToolbar } from '../../../src/features/dashboard/DashboardToolbar';

describe('dashboard/DashboardToolbar', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardToolbar {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-dashboard-toolbar').length
    ).toBe(1);
  });
});
