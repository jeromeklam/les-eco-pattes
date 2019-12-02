import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/lang/DefaultPage';

describe('lang/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      lang: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.lang-default-page').length
    ).toBe(1);
  });
});
