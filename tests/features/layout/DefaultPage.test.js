import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/desktop-layout/DefaultPage';

describe('desktop-layout/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      layout: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.desktop-layout-default-page').length
    ).toBe(1);
  });
});
