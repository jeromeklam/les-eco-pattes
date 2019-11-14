import React from 'react';
import { shallow } from 'enzyme';
import { MainHeader } from '../../../src/features/layout/MainHeader';

describe('layout/MainHeader', () => {
  it('renders node with correct class name', () => {
    const props = {
      layout: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MainHeader {...props} />
    );

    expect(
      renderedComponent.find('.layout-main-header').length
    ).toBe(1);
  });
});
