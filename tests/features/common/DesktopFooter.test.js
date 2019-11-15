import React from 'react';
import { shallow } from 'enzyme';
import { DesktopFooter } from '../../../src/features/common/DesktopFooter';

describe('common/DesktopFooter', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DesktopFooter {...props} />
    );

    expect(
      renderedComponent.find('.common-desktop-footer').length
    ).toBe(1);
  });
});
