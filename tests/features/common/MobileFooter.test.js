import React from 'react';
import { shallow } from 'enzyme';
import { MobileFooter } from '../../../src/features/common/MobileFooter';

describe('common/MobileFooter', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MobileFooter {...props} />
    );

    expect(
      renderedComponent.find('.common-mobile-footer').length
    ).toBe(1);
  });
});
