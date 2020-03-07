import React from 'react';
import { shallow } from 'enzyme';
import { DashboardGrid } from '../../../src/features/dashboard/DashboardGrid';

describe('dashboard/DashboardGrid', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardGrid {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-dashboard-grid').length
    ).toBe(1);
  });
});
