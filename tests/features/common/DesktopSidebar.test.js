import React from 'react';
import { shallow } from 'enzyme';
import { DesktopSidebar } from '../../../src/features/common/DesktopSidebar';

describe('common/DesktopSidebar', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DesktopSidebar {...props} />
    );

    expect(
      renderedComponent.find('.common-desktop-sidebar').length
    ).toBe(1);
  });
});
