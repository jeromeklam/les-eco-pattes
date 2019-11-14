import React from 'react';
import { shallow } from 'enzyme';
import { MainFooter } from '../../../src/features/layout/MainFooter';

describe('layout/MainFooter', () => {
  it('renders node with correct class name', () => {
    const props = {
      layout: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MainFooter {...props} />
    );

    expect(
      renderedComponent.find('.layout-main-footer').length
    ).toBe(1);
  });
});
