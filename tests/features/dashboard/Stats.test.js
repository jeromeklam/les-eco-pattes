import React from 'react';
import { shallow } from 'enzyme';
import { Stats } from '../../../src/features/dashboard/Stats';

describe('dashboard/Stats', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Stats {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-stats').length
    ).toBe(1);
  });
});
