import React from 'react';
import { shallow } from 'enzyme';
import { DesktopHeader } from '../../../src/features/common/DesktopHeader';

describe('common/DesktopHeader', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DesktopHeader {...props} />
    );

    expect(
      renderedComponent.find('.common-desktop-header').length
    ).toBe(1);
  });
});
