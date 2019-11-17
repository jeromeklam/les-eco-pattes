import React from 'react';
import { shallow } from 'enzyme';
import { MobileHeader } from '../../../src/features/common/MobileHeader';

describe('common/MobileHeader', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MobileHeader {...props} />
    );

    expect(
      renderedComponent.find('.common-mobile-header').length
    ).toBe(1);
  });
});
