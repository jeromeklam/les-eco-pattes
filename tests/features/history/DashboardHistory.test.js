import React from 'react';
import { shallow } from 'enzyme';
import { DashboardHistory } from '../../../src/features/history/DashboardHistory';

describe('history/DashboardHistory', () => {
  it('renders node with correct class name', () => {
    const props = {
      history: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardHistory {...props} />
    );

    expect(
      renderedComponent.find('.history-dashboard-history').length
    ).toBe(1);
  });
});
